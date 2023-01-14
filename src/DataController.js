export class DataController {
	constructor(holdTime, passTime) {
		this.holdTime = holdTime;
		this.passTime = passTime;
		this.timeData = [];
	}
    //This will grab holding and Passing minutes and seconds and return them in a array.
	#grabUserInput() {
		
			const holdTimeMin = document.getElementById("holding-min").valueAsNumber;
			const holdTimeSec = document.getElementById("holding-sec").valueAsNumber;
			const passTimeMin = document.getElementById("passing-min").valueAsNumber;
			const passTimeSec = document.getElementById("passing-sec").valueAsNumber;
			console.log(holdTimeMin + "this worked");
		
            return [holdTimeMin, holdTimeSec, passTimeMin, passTimeSec];
		
	}
    //Depending on which timer is plugged in it will update either holding or passing time properties.
	updateTimerTimes(Timer) {
        const userTimes = this.#grabUserInput();
        console.log(userTimes);
        console.log(Timer);
        if (Timer.timerName === 'HoldTimer') {
            Timer.minutes = userTimes[0];
            Timer.seconds = userTimes[1];
        } else if (Timer.timerName === 'PassTimer') {
            Timer.minutes = userTimes[2];
            Timer.seconds = userTimes[3];
        }
	}

}
