export class Timer {
	constructor(timerName) {
		this.minutes = 0;
		this.seconds = 0;
		this.futureTime = 0;
		this.isRunning = false;
		this.startTime = 0;
		this.overallTime = 0;
		this.timerName = timerName;
	}

	_getTimeElapsedSinceLastStart() {
		if (!this.startTime) {
			return 0;
		}

		return this.futureTime - Date.now() + 0.001;
	}

	start() {
		if (this.isRunning) {
			return console.error("Timer is already running");
		}

		this.isRunning = true;
        
		this.startTime = Date.now();
		//If Timer is started fresh then the first condition will run. if timer was paused there will be time left in overall time and the timer will continue.
		if (this.overallTime === 0) {
			this.futureTime = this.startTime + (this.minutes * 60000) + (this.seconds * 1000);
		} else if (this.overallTime > 0) {
            this.futureTime = this.startTime + this.overallTime;
			this.overallTime = 0;
		}
		console.log(this.minutes + ' ' + this.seconds);
	}
    
	stop() {
        if (!this.isRunning) {
            return console.error("Timer is already stopped");
		}
        
		this.isRunning = false;
        
		this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
	}
    
	reset() {
        this.overallTime = 0;
		this.startTime = Date.now();
		this.futureTime = this.startTime + (this.minutes * 60000) + (this.seconds * 1000);
        
	}
    
	getTime() {
        if (!this.startTime) {
            return 0;
		}
        
		if (this.isRunning) {
			// let ET = this._getTimeElapsedSinceLastStart();
			// console.log(this.overallTime + ET);
			
			return this.overallTime + (this._getTimeElapsedSinceLastStart() + 0.001);
		}
        if(this.overallTime === 0) {
			
			this.futureTime = this.startTime + (this.minutes * 60000) + (this.seconds * 1000);
			
			//consoles the milliseconds
			let ET = this._getTimeElapsedSinceLastStart();
			console.log(this.overallTime + ET);
            
			
			return this.overallTime + (this._getTimeElapsedSinceLastStart() + 0.001);
        }
		return this.overallTime;
		
	}
}

//BUG Time is not that accurate yet!
