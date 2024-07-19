const btn = document.getElementById("btn");
const wish = "happy new year";
const wishElement = document.getElementById("wish");

let date1 = new NepaliDate(2082, 0, 1);
date1.toJsDate();
console.log(date1);
const flipcard = document.querySelector(".flip-card");
var dark = false;

// const countToDateUTC = new Date();
// countToDateUTC.setTime(countToDateUTC.getTime() + 10000);
// console.log(countToDateUTC);

let previousTimeBetweenDates;

const intervalId = setInterval(() => {
  const currentDate = new Date();
  const timeBetweenDates = Math.floor((date1 - currentDate) / 1000);
  if (timeBetweenDates === -1) {
    console.log(wish);
    clearInterval(intervalId);
    wishElement.textContent = "Happy New Year ❤️";
    wishElement.classList.add("newyear");
  } else {
    flipAllCard(timeBetweenDates);
  }
  previousTimeBetweenDates = timeBetweenDates;
}, 250);

function flipAllCard(time) {
  //   console.log(time);
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600) % 24;
  const days = Math.floor(time / 3600 / 24);

  flip(document.querySelector("[data-days-hunds]"), Math.floor(days / 100));
  flip(
    document.querySelector("[data-days-tens]"),
    Math.floor((days % 100) / 10)
  );
  flip(document.querySelector("[data-days-ones]"), days % 10);
  flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
  flip(document.querySelector("[data-hours-ones]"), hours % 10);
  flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
  flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
  flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
  flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
}

function flip(flipcard, timeNumber) {
  const topHalf = flipcard.querySelector(".top");
  console.log(topHalf.textContent);
  const initNumber = parseInt(topHalf.textContent);
  if (timeNumber === initNumber) {
    return;
  }

  const bottomHalf = flipcard.querySelector(".bottom");
  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  topHalf.textContent = initNumber;
  bottomHalf.textContent = initNumber;
  topFlip.textContent = initNumber;
  bottomFlip.textContent = timeNumber;

  topFlip.addEventListener("animationstart", (e) => {
    topHalf.textContent = timeNumber;
  });

  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });

  bottomFlip.addEventListener("animationend", (e) => {
    bottomHalf.textContent = timeNumber;
    bottomFlip.remove();
  });

  flipcard.classList.add("flip");
  flipcard.append(topFlip, bottomFlip);
}

btn.addEventListener("click", function () {
  console.log("re");
  dark = !dark;
  if (dark) {
    document.body.classList.add("new");
  } else {
    document.body.classList.remove("new");
  }
});
