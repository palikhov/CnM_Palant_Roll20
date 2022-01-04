const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

function getAuthentication () {
	return new Promise((resolve, reject) => {
		fs.readFile('credentials.json', (err, content) => {
			if (err) reject(`Error loading client secret file: ${err.message}`);

			authorize(JSON.parse(content)).then(token => resolve(token));
		});
	});
}

/**
 * Create an OAuth2 client with the given credentials.
 * @param {Object} credentials The authorization client credentials.
 */
function authorize (credentials) {
	return new Promise(resolve => {
		const {client_secret, client_id, redirect_uris} = credentials.installed;
		const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

		// Check if we have previously stored a token.
		fs.readFile(TOKEN_PATH, (err, token) => {
			if (err) {
				console.warn("Generating new token...");
				getNewToken(oAuth2Client).then(oAuth2ClientWithCreds => {
					resolve(oAuth2ClientWithCreds);
				});
			} else {
				oAuth2Client.setCredentials(JSON.parse(token));
				resolve(oAuth2Client);
			}
		});
	});
}

/**
 * Get and store new token after prompting for user authorization.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
function getNewToken (oAuth2Client) {
	return new Promise((resolve, reject) => {
		const authUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES,
		});
		console.log('Authorize this app by visiting this url:', authUrl);
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		rl.question('Enter the code from that page here: ', (code) => {
			rl.close();
			oAuth2Client.getToken(code, (err, token) => {
				if (err) reject(`Error while trying to retrieve access token: ${err.message}`);

				oAuth2Client.setCredentials(token);
				// Store the token to disk for later program executions
				fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
					if (err) console.error(err);
					console.log('Token stored to', TOKEN_PATH);
				});
				resolve(oAuth2Client);
			});
		});
	});
}

function getSheets () {
	return new Promise(resolve => {
		getAuthentication().then(auth => {
			resolve(google.sheets({version: 'v4', auth}));
		})
	});
}

async function pGetSheetValues (sheets, spreadsheetId, range) {
	return new Promise((resolve, reject) => {
		sheets.spreadsheets.values.get({
			spreadsheetId,
			range,
		}, (err, res) => {
			if (err) reject(err);
			resolve(res);
		});
	});
}

module.exports = {
	getSheets,
	pGetSheetValues
};
