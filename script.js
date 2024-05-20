const btn = document.getElementById("btn");
// const flipcard = document.querySelector(".flip-card");
var dark = false;

// const countToDate = new Date().setHours(new Date().getHours() + 24);

const countToDateUTC = new Date("2025-04-11T18:15:00.000Z");

const countToDateLocal = new Date(countToDateUTC.toLocaleString());
let previousTimeBetweenDates;

setInterval(() => {
  const currentDate = new Date();
  //   console.log(currentDate);
  const timeBetweenDates = Math.floor((countToDateUTC - currentDate) / 1000);

  flipAllCard(timeBetweenDates);
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
  const initNumber = parseInt(topHalf.textContent);
  if (timeNumber === initNumber) return;

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
