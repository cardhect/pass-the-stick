import "./style.css";
import { Timer } from "./Timer";
import { DataController } from "./DataController";
import { DisplayController } from "./DisplayController";
import  alertSound from "./audio/alertSound.mp3";

let alertNoise;


const DataControl = new DataController();
const DisplayControl = new DisplayController();

export const HoldTimer = new Timer("HoldTimer");
export const PassTimer = new Timer("PassTimer");



const userInputSubmitBtn = document.getElementById("userInputSubmit");
userInputSubmitBtn.addEventListener("click", () => {
	DataControl.updateTimerTimes(HoldTimer);
	DataControl.updateTimerTimes(PassTimer);
	//Grabs User input and resets old inputs if any.
	HoldTimer.reset();
	PassTimer.reset();
	//Updates counter with user inputs
	DisplayControl.updateCounter(HoldTimer);

	//If timer is ended in the passing timer
	let currentTimerClass = document.getElementById("countdown").className;
	if (currentTimerClass === 'passing') {
		document.getElementById("countdown").className = "holding";
		
	}

	//This will show the session display after user enters inputs
	DisplayControl.updateDisplay();
	if(!alertNoise){
        alertNoise = new Audio(alertSound);
    }

	
});


//Grabs all the session control buttons and puts adds a event listener to them.
const controlBtns = document.querySelectorAll(".control-btns");
const countdownTimer = document.getElementById('countdown');
for (let i = 0; i < controlBtns.length; i++) {
	const controlButtons = controlBtns[i];
	
	controlButtons.addEventListener("click", (e) => {
		if (controlButtons.id === "start-btn") {
			if (countdownTimer.className == "holding") {	
				HoldTimer.start();
				timerLoopInterval(HoldTimer);
				
			} else if (countdownTimer.className == 'passing') {
				PassTimer.start();
				timerLoopInterval(PassTimer);
			}
		}
		if (controlButtons.id === "pause-btn") {
			if (countdownTimer.className == "holding") {	
				HoldTimer.stop();
			} else if (countdownTimer.className == 'passing') {
				PassTimer.stop();
			}
		}
		if (controlButtons.id === "reset-btn") {
			if (countdownTimer.className == "holding") {	
				HoldTimer.reset();
			} else if (countdownTimer.className == 'passing') {
				//Figure out what happens here
				PassTimer.reset();
			}
		}
		if (controlButtons.id === "end-btn") {
			if (countdownTimer.className == "holding") {	
				HoldTimer.stop();
				HoldTimer.reset();
			} else if (countdownTimer.className == 'passing') {
				PassTimer.stop();
				PassTimer.reset();
			}
			//this should take you back to the user input display
			DisplayControl.updateDisplay();
		}

	});
}
function timerLoopInterval(Timer) {
	const timerInterval = setInterval(() => {
		
		const currentCounter = document.getElementById('countdown').className;
		
		if(currentCounter == 'holding') {
			DisplayControl.updateCounter(HoldTimer);
			
		} else {
			DisplayControl.updateCounter(PassTimer);
			
		}
		
		if (currentCounter == 'holding' && HoldTimer.isRunning == false) {
			clearInterval(timerInterval);
			
		} else if (currentCounter == 'passing' && PassTimer.isRunning == false) {
			
			clearInterval(timerInterval);
		}
		
		//This is the logic for checking if the timer has ended. Then starts the next timer. repeating..
		// if (timeInSeconds <= 0
		const countdownEleText = document.getElementById('countdown').innerText;
		
		if (countdownEleText == '-1:0-1') {
			// setTimeout(() => {
				console.log(countdownEleText);
				DisplayControl.changeCounterDisplay();
				const currentCounter = document.getElementById('countdown').className;
				
				if (currentCounter == 'holding') {
					HoldTimer.reset();
					HoldTimer.start();
					DisplayControl.updateCounter(HoldTimer);
					PassTimer.stop();
					return;
				} else if (currentCounter == 'passing') {
					alertNoise.play();
					PassTimer.reset();
					PassTimer.start();
					DisplayControl.updateCounter(PassTimer);
					HoldTimer.stop();
					return;
				}
				// return "Finished!";
				clearInterval(timerInterval);

			// },1000);
		}
	
	}, 500);
}