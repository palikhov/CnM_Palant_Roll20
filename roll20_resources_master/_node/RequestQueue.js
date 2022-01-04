const kg = require("./Kludge");

class RequestQueue {
	constructor (parallelism) {
		this.parallelism = parallelism;

		this.active = 0;
		this.queue = [];
	}

	/**
	 * @param task A function that returns a promise
	 */
	add (task) {
		if (this.active < this.parallelism) {
			this.active++;
			task().then(() => {
				this.active--;
				this._doRunNextTask();
			}).catch(e => {
				console.log(`${kg.logPad("QUEUE")}Uncaught exception in task:`, e.message);
				this.active--;
				this._doRunNextTask();
			});
		} else {
			this.queue.push(task);
		}
	}

	_doRunNextTask () {
		if (this.queue.length) {
			this.active++;
			const task = this.queue.shift();
			task().then(() => {
				this.active--;
				this._doRunNextTask();
			}).catch(e => {
				console.log(`${kg.logPad("QUEUE")}Uncaught exception in task:`, e.message);
				this.active--;
				this._doRunNextTask();
			});
		} else if (this.active <= 0) console.log(`${kg.logPad("QUEUE")}All tasks complete.`);
	}

	get length () {
		return this.queue.length;
	}
}

module.exports = {
	RequestQueue
};
