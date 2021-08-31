//HTML teathers
const secondsTextValue = document.getElementById("seconds-value");
const minutesTextValue = document.getElementById('minutes-value');
const hoursTextValue = document.getElementById('hours-value');
const daysTextValue = document.getElementById('days-value');

//Set initial values
const zeroed = 0;
const secondsPerMinute = 60;
const minutesPerHour = 60;
const hoursPerDay = 24;

//Calculated initial values
const secondsPerHour = secondsPerMinute * minutesPerHour;
const secondsPerDay = secondsPerHour * hoursPerDay;

//Run values
let timeInSeconds;
let previousTimeInSeconds;
let seconds = zeroed;
let minutes = zeroed;
let hours = zeroed;
let days = zeroed;

//Calculates, and reports the values to the HTML teathers
function timeFlow() {
  let timeDistribution = timeInSeconds;

  seconds = timeDistribution % secondsPerMinute;
  timeDistribution = timeDistribution - seconds;

  minutes = timeDistribution % secondsPerHour;
  timeDistribution = timeDistribution - minutes;
  minutes = minutes / secondsPerMinute;

  hours = timeDistribution % secondsPerDay;
  timeDistribution = timeDistribution - hours;
  hours = hours / secondsPerHour;

  days = timeDistribution / secondsPerDay;

  secondsTextValue.textContent = seconds;
  minutesTextValue.textContent = minutes;
  hoursTextValue.textContent = hours;
  daysTextValue.textContent = days;
}

//Defines the timer, found this online, and haven't really touched it yet
//Should be able to add more features using it
class Timer {
  constructor () {
    this.isRunning = false;
    this.startTime = 0;
    this.overallTime = 0;
  }

  _getTimeElapsedSinceLastStart () {
    if (!this.startTime) {
      return 0;
    }
  
    return Date.now() - this.startTime;
  }

  start () {
    if (this.isRunning) {
      return console.error('Timer is already running');
    }

    this.isRunning = true;

    this.startTime = Date.now();
  }

  stop () {
    if (!this.isRunning) {
      return console.error('Timer is already stopped');
    }

    this.isRunning = false;

    this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
  }

  reset () {
    this.overallTime = 0;

    if (this.isRunning) {
      this.startTime = Date.now();
      return;
    }

    this.startTime = 0;
  }

  getTime () {
    if (!this.startTime) {
      return 0;
    }

    if (this.isRunning) {
      return this.overallTime + this._getTimeElapsedSinceLastStart();
    }

    return this.overallTime;
  }
}

//The heart-beat of the whole thing, runs the specified code once every second when turned "on"
//copied this off the internet with the timer class
//Auto adjusts for browser lag
const timer = new Timer();
timer.start();
setInterval(() => {
  timeInSeconds = Math.round(timer.getTime() / 1000);
  //I replaced the code that was being run here with this
  if (timeInSeconds !== previousTimeInSeconds && timeInSeconds !== 0) {
    previousTimeInSeconds = timeInSeconds;
    timeFlow ();
  }
    //My edits end here
}, 100)