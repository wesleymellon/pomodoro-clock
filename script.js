const defaultSessionTime = 1500; // 25 minutes in seconds
const defaultBreakTime = 300; // 5 minutes in seconds
let sessionTime = defaultSessionTime; 
let breakTime = defaultBreakTime; 
let timerTime = sessionTime;
let currentTimerType = "session";
let interval;

let sessionTimeElement = document.getElementById("session-time");
let breakTimeElement = document.getElementById("break-time");
let timerTimeElement = document.getElementById("timer-time");
let sessionDownButton = document.getElementById("session-time-down");
let sessionUpButton = document.getElementById("session-time-up");
let breakDownButton = document.getElementById("break-time-down");
let breakUpButton = document.getElementById("break-time-up");
let playButton = document.getElementById("play-button");
let pauseButton = document.getElementById("pause-button");
let resetButton = document.getElementById("reset-button");

sessionDownButton.addEventListener("click", function(e) {
  sessionTime -= 60;
  paintSessionTime();
});

sessionUpButton.addEventListener("click", function(e) {
  sessionTime += 60;
  paintSessionTime();
});

breakDownButton.addEventListener("click", function(e) {
  breakTime -= 60;
  paintBreakTime();
});

breakUpButton.addEventListener("click", function(e) {
  breakTime += 60;
  paintBreakTime();
});

playButton.addEventListener("click", function(e) {
  tickTimer();
});

pauseButton.addEventListener("click", function(e) {
  stopTimer();
});

resetButton.addEventListener("click", function(e) {
  sessionTime = defaultSessionTime;
  breakTime = defaultBreakTime;
  timerTime = sessionTime;
  paintDefault();
  stopTimer();
});

function paintDefault() {
  paintSessionTime();
  paintBreakTime();
  paintTimerTime();
}

function timeToString(timeInSeconds) {
  let timerMinutes = Math.floor(timeInSeconds / 60);
  let timerSeconds = timeInSeconds % 60;
  return `${timerMinutes < 10 ? 0 : ""}${timerMinutes}:${timerSeconds < 10 ? 0 : ""}${timerSeconds}`
}

function swapTimerType() {
  if (currentTimerType == "session") {
    currentTimerType = "break";
    timerTime = breakTime;
  } else {
    currentTimerType = "session";
    timerTime = sessionTime;
  }
}

function tickTimer() {
  interval = setInterval(function(){
    timerTime -= 1;
    paintTimerTime();

    if (timerTime <= 0) {
      swapTimerType();
    }

  }, 1000);
}

function paintBreakTime() {
  breakTimeElement.innerHTML = timeToString(breakTime);
}

function paintSessionTime() {
  sessionTimeElement.innerHTML = timeToString(sessionTime);
}

function paintTimerTime() {
  timerDisplay = timeToString(timerTime);
  timerTimeElement.innerHTML = timerDisplay;
}

function stopTimer() {
  clearInterval(interval);
}

paintDefault();
