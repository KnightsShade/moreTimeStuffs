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

const secondsTextValue = document.getElementById("seconds-value");
const minutesTextValue = document.getElementById('minutes-value');
const hoursTextValue = document.getElementById('hours-value');
const daysTextValue = document.getElementById('days-value');

const zeroed = 0;
const secondsPerMinute = 2;
const minutesPerHour = 2;
const hoursPerDay = 2;

const secondsPerHour = secondsPerMinute * minutesPerHour;
const secondsPerDay = secondsPerHour * hoursPerDay;



let timeInSeconds;
let previousTimeInSeconds;
let seconds = zeroed;
let minutes = zeroed;
let hours = zeroed;
let days = zeroed;

const timer = new Timer();
timer.start();
setInterval(() => {
  timeInSeconds = Math.round(timer.getTime() / 1000);

  //Adds a second when needed
  if (timeInSeconds !== previousTimeInSeconds && timeInSeconds !== 0) {

    previousTimeInSeconds = timeInSeconds;
    seconds ++;

    if (seconds < secondsPerMinute) {
      secondsTextValue.textContent = seconds;

  } else if (seconds >= secondsPerMinute) {
      timeFlow ();
  }

  }
}, 100)

function minutesController(argument) {
  
  if (seconds = secondsPerMinute) {
      seconds = seconds - secondsPerMinute;
      secondsTextValue.textContent = seconds;
      minutes++;

      if (minutes < minutesPerHour) {
       minutesTextValue.textContent = minutes;

      } else if (minutes >= minutesPerHour) {
        hoursController ()
      }

  } else if (seconds > secondsPerMinute) {

  }

}

function hoursController() {

  if (minutes = minutesPerHour) {
    minutes = minutes - minutesPerHour;
    minutesTextValue.textContent = minutes;
    hours++;
    

    if (hours < hoursPerDay) {
      hoursTextValue.textContent = hours;

    }else if (hours >= hoursPerDay) {
      daysController ()
    }

  } else if (minutes > minutesPerHour) {

  }

}

function daysController() {
  hours = hours - hoursPerDay;
  hoursTextValue.textContent = hours;
  days++;
  daysTextValue.textContent = days;
}

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