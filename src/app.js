import { LightningElement, track, api } from 'lwc';

export default class App extends LightningElement {
    @api startTimer = false;
    
    startPolling(){
        this.startTimer = true;
    }
    stopPolling(){
        console.log('stopping timer');
        this.startTimer = false;
    }
}
