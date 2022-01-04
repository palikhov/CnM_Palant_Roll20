const fs = require("fs");
const crypto = require("crypto");
const sharp = require("sharp");
const axios = require("axios");
const google = require("./GoogleAuth");
const rq = require("./RequestQueue");
const kg = require("./Kludge");

process.on("unhandledRejection", (e) => console.error(`${kg.logPad("PROCESS")}Unhandled rejection caught by process handler!`, e.message));

global.args = require('minimist')(process.argv.slice(2));

if (args.h || args.help) {
	console.log(`Usage: npm run art [-- [dry] [nothumbs]]`);
	return;
}

class ArtGrab {
	constructor (opt= {}) {
		this.dryRun = opt.dryRun;
		this.skipThumbnailGeneration = opt.skipThumbnailGeneration;
		this.overwriteFiles = opt.force;
		this.retryTimeout = opt.timeout || ArtGrab.RETRY_TIMEOUT;
		this.retryCount = opt.retry || ArtGrab.RETRY_COUNT;

		this.requestQueue = new rq.RequestQueue(16);

		this.filesToRemove = {};
		this.fileCount = 0;
		this.thumbnailCount = 0;
		this.enums = {}; // fill this with values for each field
		this.index = {}; // fill this with metadata for each file
		this.schema = {
			Artist: {
				prop: "artist",
				default: "Unknown"
			},
			Set: {
				prop: "set",
				default: "Miscellaneous"
			},
			URI: {
				prop: "uri",
				clean: cell => cell.split("---").last(),
				require: true
			},
			"Feature(s)": {
				prop: "features",
				map: ArtGrab.semicolonMapper,
				index: true
			},
			"Size/Resolution": {
				ignore: true,
				prop: "size"
			},
			ImageType: {
				prop: "imageType",
				map: ArtGrab.semicolonMapper,
				enum: true
			},
			Setting: {
				prop: "setting",
				map: ArtGrab.semicolonMapper,
				enum: true
			},
			Style: {
				prop: "style",
				map: ArtGrab.semicolonMapper,
				enum: true
			},
			Quality: {
				prop: "quality",
				map: ArtGrab.semicolonMapper,
				enum: true
			},
			View: {
				prop: "view",
				map: ArtGrab.semicolonMapper,
				enum: true
			},
			Grid: {
				prop: "grid",
				map: ArtGrab.semicolonMapper,
				enum: true
			},
			Terrain: {
				prop: "terrain",
				map: ArtGrab.semicolonMapper,
				enum: true
			},
			Audience: {
				prop: "audience",
				map: ArtGrab.semicolonMapper,
				enum: true
			},
			"Sex/Gender": {
				prop: "gender",
				map: ArtGrab.semicolonMapper,
				enum: true
			},
			"Monster Type": {
				prop: "monster",
				map: ArtGrab.semicolonMapper,
				enum: true
			},
			Class: {
				prop: "class"
			},
			Support: {
				prop: "support"
			},
			Ready: {
				ignore: true,
				prop: "ready"
			}
		};
		this.schemaByIndexCache = null;

		this.lastArtist = null;
		this.lastSet = null;
		this.accumulatedRows = null;
	}

	async pMain () {
		const targetSheets = kg.readJson(`./_node/target-sheets.json`);

		console.log(`${kg.logPad("SHEETS")}Authenticating...`);
		const sheets = await google.getSheets();

		// region headers
		const allHeaders = await Promise.all(targetSheets.map(it => google.pGetSheetValues(sheets, it.docsId, `${it.sheetName}!A1:T1`)));
		console.log(`${kg.logPad("SHEETS")}Retrieved headers...`);

		// Ensure all header values are the same
		const headerSet = new Set();
		allHeaders
			.map(it => (it.data.values || [[]])[0].map(it => (it || "").trim()).join(", "))
			.forEach(it => headerSet.add(it));
		if (headerSet.size > 1) throw new Error(`Multiple header sets found! All sheets must have the same exact headers (case sensitive).\nHeader sets were:\n${[...allHeaders].map(it => `\t${it}`).join("\n")}`);

		const headerRows = allHeaders[0].data.values;
		if (headerRows.length) {
			headerRows[0].map(it => (it || "").trim()).forEach((h, i) => {
				const target = Object.entries(this.schema).find(([k, v]) => k === h);
				if (target) target[1].rowIndex = i;
			});

			const notFound = Object.entries(this.schema).filter(([k, v]) => v.rowIndex == null && !v.ignore);
			if (notFound.length) throw new Error(`Schema mismatch; the following headers were not found in the spreadsheet: ${notFound.map(nf => `"${nf[0]}"`).join("; ")}\nNote that headers are CaSe-SeNsItIvE!`);

			this._generateSchemaByIndexCache();
		} else throw new Error(`No headers found!`);
		// endregion

		// region bodies

		// track all current files, so we can later delete those which should not exist
		const extDistDir = "ExternalArt/dist";
		fs.mkdirSync(extDistDir, {recursive: true});
		fs.readdirSync(extDistDir).forEach(file => this.filesToRemove[file] = true);

		for (const targetSheet of targetSheets) {
			const resBody = await google.pGetSheetValues(sheets, targetSheet.docsId, `${targetSheet.sheetName}!A2:T`);
			console.log(`${kg.logPad("SHEETS")}Retrieved rows for ${targetSheet.docsId} -> ${targetSheet.sheetName}...`);

			const rowsBody = resBody.data.values;
			rowsBody.map(r => this._parseRow(r)).filter(it => it).sort(ArtGrab._sortRows).forEach(r => {
				if (this.lastArtist == null && this.lastSet == null) {
					this.accumulatedRows = [r];
					this.lastArtist = r.artist;
					this.lastSet = r.set;
				} else {
					this._doAccumulateAndOutput(r);
				}
			});
		}
		this._doAccumulateAndOutput({artist: "", set: "", _isLastRow: true}); // pass an empty row to trigger output

		// output enum metadata
		Object.values(this.enums).forEach(enumList => enumList.sort((a, b) => kg.ascSortLower(a.v, b.v)));
		this._saveMetaFile("enums", this.enums);

		// output index metadata
		Object.values(this.index).forEach(fileIndex => Object.keys(fileIndex).filter(k => !k.startsWith("_")).forEach(k => fileIndex[k].sort(kg.ascSortLower)));
		this._saveMetaFile(`index`, this.index);

		console.log(`${kg.logPad("PROCESS")}Sheet processing complete. Output ${this.fileCount} data files.${this.requestQueue.length ? ` Thumbnail creation is active, with ${this.requestQueue.length.toLocaleString()} requests queued.` : ""}`);

		if (!this.dryRun) {
			console.log(`${kg.logPad("PROCESS")}Cleaning output directory...`);
			Object.keys(this.filesToRemove).forEach(f => fs.unlinkSync(`./ExternalArt/dist/${f}`));
			console.log(`${kg.logPad("PROCESS")}${Object.keys(this.filesToRemove).length} files deleted.`);
		}
		// endregion
	}

	_doAccumulateAndOutput (row) {
		if (row.artist.toLowerCase() === this.lastArtist.toLowerCase() && row.set.toLowerCase() === this.lastSet.toLowerCase()) {
			this.accumulatedRows.push(row);
		} else {
			const fileName = this._saveFile(this.lastArtist, this.lastSet, {data: this.accumulatedRows});
			this._indexFile(this.lastArtist, this.lastSet, fileName, this.accumulatedRows);
			if (this.accumulatedRows.length === 1) console.warn(`${kg.logPad("ACCUMULATOR")}Artist: "${this.lastArtist}"; set: "${this.lastSet}" had only one item!`);
			this.lastSet = row.set;
			this.lastArtist = row.artist;
			this.accumulatedRows = [row];
		}

		const thumbName = ArtGrab.__getThumbnailFilename(row.artist, row.set, row.hash);
		delete this.filesToRemove[thumbName];
		if (!row._isLastRow && !this.skipThumbnailGeneration) {
			this.requestQueue.add(this._doSaveThumbnail.bind(this, row.artist, row.set, row.uri, row.hash));
		}
	}

	static __getThumbnailFilename (artist, set, uriHash) {
		const slugName = ArtGrab.__getSlug(artist, set);
		return `${slugName}--thumb-${uriHash}.jpg`;
	}

	async _doSaveThumbnail (artist, set, uri, uriHash) {
		const fileName = ArtGrab.__getThumbnailFilename(artist, set, uriHash);
		const path = `./ExternalArt/dist/${fileName}`;

		if (!this.overwriteFiles && fs.existsSync(path)) return this.__doThumbnailLog();

		let imageData = null;
		let retries = this.retryCount;
		let lastE = null;
		while (retries-- > 0 && imageData == null) {
			try {
				const resp = await axios.get(uri, {responseType: "arraybuffer"});
				imageData = resp.data;
			} catch (e) {
				lastE = e;
				await new Promise(resolve => setTimeout(() => resolve(), this.retryTimeout));
			}
		}
		if (imageData == null) return console.error(`${kg.logPad("THUMBNAIL")}Failed to retrieve image data from "${uri}": `, (lastE | {}).message);

		let img;
		try {
			img = sharp(imageData, {limitInputPixels: false})
				.flatten({background: ArtGrab.WHITE}) // remove alpha channel
				.resize(180, 180, {fit: "contain", background: ArtGrab.WHITE})
				.jpeg({quality: 70});
		} catch (e) { return console.error(`${kg.logPad("THUMBNAIL")}Failed to create thumbnail image for "${uri}": `, e.message); }

		if (this.dryRun) console.log(`${kg.logPad("DRY_RUN")}Skipping image write: "${fileName}"...`);
		else {
			try { await img.toFile(path); }
			catch (e) { return console.error(`${kg.logPad("THUMBNAIL")}Failed to save thumbnail image for "${uri}":`, e.message); }
			this.__doThumbnailLog();
		}
	}

	__doThumbnailLog () {
		const thumbnailCount = ++this.thumbnailCount;
		if (!(thumbnailCount % 50)) console.log(`${kg.logPad("THUMBNAIL")}${thumbnailCount} thumbnails processed...`);
	}

	_parseRow (row) {
		const addToEnum = (prop, val) => {
			this.enums[prop] = this.enums[prop] || [];
			const existing = this.enums[prop].find(it => it.v === val);
			if (existing) {
				existing.c++;
			} else {
				this.enums[prop].push({
					v: val,
					c: 1
				})
			}
		};

		let hasAny = false;
		const out = {};

		for (let i = 0; i < row.length; ++i) {
			let cell = row[i];
			if (cell) cell = cell.trim();

			const schema = this.schemaByIndexCache[i];
			if (schema) {
				if (!cell && schema.default) cell = kg.copy(schema.default);

				if (schema.clean) cell = schema.clean(cell);
				if (schema.require && !cell) return null;
				if (!cell) continue;

				if (schema.map) cell = schema.map(cell);

				if (schema.enum) {
					if (cell instanceof Array) cell.forEach(c => addToEnum(schema.prop, c));
					else addToEnum(schema.prop, cell)
				}

				hasAny = true;
				out[schema.prop] = cell;
			}
		}

		if (!hasAny) return null;
		out.hash = crypto.createHash("md5").update(out.uri).digest("hex");
		return out;
	}

	_generateSchemaByIndexCache () {
		this.schemaByIndexCache = {};
		Object.values(this.schema).filter(v => !v.ignore).forEach(v => {
			this.schemaByIndexCache[v.rowIndex] = v;
		});
	}

	static __getSlug (artist, set) {
		function getSlugged (string) {
			return string.toLowerCase().replace(/ /g, "-").replace(/[^-_a-z0-9]/g, "");
		}

		return `${getSlugged(artist)}--${getSlugged(set)}`;
	}

	_getNextFilename (artist, set) {
		this.fileCount++;
		const slugName = ArtGrab.__getSlug(artist, set);
		return `${slugName}.json`;
	}

	_indexFile (artist, set, fileName, contents) {
		fileName = fileName.replace(/\.json$/, "");
		const target = (this.index[fileName] = {});
		const indexProps = Object.values(this.schema).filter(v => v.enum || v.index);
		contents.forEach(row => {
			indexProps.forEach(v => {
				const target2 = (target[v.prop] = target[v.prop] || []);
				const cell = row[v.prop];
				if (cell instanceof Array) {
					cell.map(it => v.index ? it.toLowerCase() : it).forEach(cellPart => {
						if (!target2.includes(cellPart)) target2.push(cellPart);
					})
				} else if (cell) {
					if (!target2.includes(cell)) target2.push(cell => v.index ? cell.toLowerCase() : cell);
				}
			})
		});
		Object.keys(target).forEach(k => {
			if (!target[k].length) delete target[k];
		});
		target._artist = artist;
		target._set = set;
		target._sample = contents.slice(0, 4).map(it => it.hash);
		target._size = contents.length;
	}

	_saveFile (artist, set, contents) {
	 	const fileName = this._getNextFilename(artist, set);
		const filePath = `./ExternalArt/dist/${fileName}`;
		delete this.filesToRemove[fileName];

		// add headers
		contents.artist = artist;
		contents.set = set;
		// remove excess data
		contents.data.forEach(d => {
			delete d.artist;
			delete d.set;
		});

		if (!this.overwriteFiles && fs.existsSync(filePath)) return fileName;

		if (this.dryRun) console.log(`${kg.logPad("DRY_RUN")}Skipping data write: "${filePath}" (${contents.data.length} entries)...`);
		else fs.writeFileSync(filePath, JSON.stringify(contents), "utf-8");
		return fileName;
	}

	_saveMetaFile (metaName, data) {
		const fileName = `_meta_${metaName}.json`;
		const filePath = `./ExternalArt/dist/${fileName}`;
		delete this.filesToRemove[fileName];

		// Always --force write here, as the meta files should probably always be changed
		if (this.dryRun) console.log(`${kg.logPad("DRY_RUN")}Skipping meta write: "${filePath}"...`);
		else fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");
	}

	static _sortRows (a, b) {
		return kg.ascSortLower(a.artist, b.artist) || kg.ascSortLower(a.set, b.set);
	}

	static semicolonMapper (cell) {
		return cell.split(/;/g).map(it => (it || "").trim()).filter(Boolean);
	}
}
ArtGrab.WHITE = {r: 255, g: 255, b: 255, alpha: 1};
ArtGrab.RETRY_TIMEOUT = 100;
ArtGrab.RETRY_COUNT = 3;

const grabber = new ArtGrab({
	dryRun: !!args.dry,
	skipThumbnailGeneration: !!args.nothumbs,
	force: !!args.force,
	timeout: args.timeout,
	retry: args.retry
});
grabber.pMain().catch(e => { console.error(e.stack); });
