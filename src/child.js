import {LightningElement, track, api} from 'lwc';

export default class child extends LightningElement {
    @track startTimerValue = false;
    @api countdownLabel;

    @api set startTimer(value){
        this.startTimerValue = value;
    
        if(value === true){
            this.startCountdown();
        }else{
            this.clearTimer();
        }
    }
    get startTimer(){
        return this.startTimerValue;
    }

    @track minutesLeft = "00";
    @api minuteStartValue = 0;
	@track secondsLeft = "00";
    @api secondsStartValue = 0;

	@track countdownInterval;

	@api countdownIntervalMinutes = 0;
	@api countdownIntervalSeconds = 0;

	startCountdown() {
		//this.clearTimer();

		if (this.startTimerValue) {
            console.log('starting');

            if((this.countdownIntervalMinutes > 0 || this.countdownIntervalSeconds > 0)){
			    this.minutesLeft = this.countdownIntervalMinutes;
			    this.secondsLeft = this.countdownIntervalSeconds;

            }else{
			    this.minutesLeft = this.minuteStartValue;
			    this.secondsLeft = this.secondsStartValue;
            }
			// this.countdown();
            this.countdownInterval = setInterval(() => {
				this.countdown();
			}, 1000);
		}
	}

	countdown() {
		if(this.startTimerValue) {
            console.log('countdown');
			var m = this.minutesLeft;
			var s = this.secondsLeft;


console.log(m + ' - ' + s);

			if (((m || 0) <= 0) && ((s || 0) <= 0)) return;

			if ((s || 0) <= 0) {
				m -= 1;
				s = 59;
			} else {
				s -= 1;
			}

			this.minutesLeft = m;
			this.secondsLeft = s;
console.log(this.minutesLeft + ' - ' + this.secondsLeft);

if( parseInt(this.minutesLeft) === 0 && parseInt(this.secondsLeft) === 0){
    this.startTimer = false;
}
			//var _this = this;
			// this.countdownInterval = setInterval(() => {
			// 	_this.countdown();
			// }, 1000);
		}
    }
	
    clearTimer (){
		if(this.countdownInterval) {
			// alert('stopping');
			clearInterval(this.countdownInterval);
			this.countdownInterval = null;
			this.startTimer = false;
            // this.minuteStartValue = 10;
            // this.secondsStartValue = 60;
            this.minutesLeft = "00";
            this.secondsLeft = "00";
            this.dispatchEvent(
				new CustomEvent('timerstopped')
			);

		}
	}


}