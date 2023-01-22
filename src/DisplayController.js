import "./style.css";
import { Timer } from "./Timer";
import {PassTimer} from './index';
import {HoldTimer} from "./index";
export class DisplayController {
	constructor() {}

	updateCounter(Timer) {
		
		// const myInterval = setInterval(() => {
			const timeInSeconds = Math.floor(Timer.getTime() / 1000);
			const minute = Math.floor(Timer.getTime() / 60000);
			let second = timeInSeconds % 60;
			//When the seconds reaches zero add another zero si ti shows as  0:00 instead of 0:0.
			second = second < 10 ? "0" + second : second;

			const countdownEle = document.getElementById("countdown");
			countdownEle.innerHTML = `${minute}:${second}`;

			// if (Timer.isRunning == false) {
			// 	clearInterval(myInterval);
			// }
			//This should be moved out of here.
			//This is the logic for checking if the timer has ended. Then starts the next timer. repeating..
			// if (timeInSeconds <= 0) {
			// 	this.changeCounterDisplay();

			// 	const currentCounter = document.getElementById('countdown').className;
			// 	if (currentCounter == 'holding') {
			// 		HoldTimer.start();
			// 		this.updateCounter(HoldTimer);
			// 		PassTimer.stop();
			// 		PassTimer.reset();
			// 	} else if (currentCounter == 'passing') {
			// 		PassTimer.start();
			// 		this.updateCounter(PassTimer);
			// 		HoldTimer.stop();
			// 		HoldTimer.reset();
					
			// 	}
			// 	// return "Finished!";
			// 	clearInterval(myInterval);
			// }

			// document.getElementById("countdown").innerText = `${minute}:${second}`;
		// }, 100);
	}
	//changes between user form or session elements.
	updateDisplay() {
		let userInputForm = document.getElementById("user-set-form");

		userInputForm.classList.toggle("hide");
		userInputForm.classList.toggle('user-set-form');

		let sessionDisplay = document.getElementById("session-display");

		sessionDisplay.classList.toggle("hide");
		sessionDisplay.classList.toggle("session-display-format");
		
	}

	#toggleCountdownClass() {
		if (document.getElementById("countdown").className == "holding") {
			document.getElementById("countdown").className = "passing";
		} else {
			document.getElementById("countdown").className = "holding";
		}
	}

	changeCounterDisplay() {
		const countdownElement = document.getElementById("countdown");

		if (countdownElement.innerText === "-1:0-1") {
			this.#toggleCountdownClass();
		}
	}
}
