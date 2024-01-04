// // variables

// let workTitle = document.getElementById("work");
// let breakTitle = document.getElementById("break");
// let longBreak = document.getElementById("long-break");

// let workTime = 25;
// let breakTime = 5;

// let seconds = "00";

// // display
// window.onload = () => {
//   document.getElementById("minutes").innerHTML = workTime;
//   document.getElementById("seconds").innerHTML = seconds;

//   workTitle.classList.add("active");
// };

// // start timer
// function start() {
//   // change button
//   document.getElementById("start").style.display = "none";
//   document.getElementById("reset").style.display = "block";

//   // change the time
//   seconds = 59;

//   let workMinutes = workTime - 1;
//   let breakMinutes = breakTime - 1;

//   breakCount = 0;

//   // countdown
//   let timerFunction = () => {
//     //change the display
//     document.getElementById("minutes").innerHTML = workMinutes;
//     document.getElementById("seconds").innerHTML = seconds;

//     // start
//     seconds = seconds - 1;

//     if (seconds === 0) {
//       workMinutes = workMinutes - 1;
//       if (workMinutes === -1) {
//         if (breakCount % 2 === 0) {
//           // start break
//           workMinutes = breakMinutes;
//           breakCount++;

//           // change the painel
//           workTitle.classList.remove("active");
//           breakTitle.classList.add("active");
//         } else {
//           // continue work
//           workMinutes = workTime;
//           breakCount++;

//           // change the painel
//           breakTitle.classList.remove("active");
//           workTitle.classList.add("active");
//         }
//       }
//       seconds = 59;
//     }
//   };

//   // start countdown
//   setInterval(timerFunction, 1000); // 1000 = 1s
// }

let workTitle = document.getElementById("work");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;
const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};
reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);
const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};
focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});
shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});
longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});
pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);
startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});
