const TIME_LIMIT = 60;
const TEXT =
  "سعی نکنید همه چیز را بدانید. شما ممکن است خیلی چیزها را دیده و انجام داده باشید، اما لزوما به این معنی نیست که شما می دانید بهترین است. سعی نکنید به مردم بگویید که چگونه می توانند کارها را به شیوه ای بهتر انجام دهند یا اینکه بهتر می توانند کاری انجام دهند.";

let wpmText = document.getElementById("wpm");
let errorText = document.getElementById("errors");
let timerText = document.getElementById("time");
let accuracyText = document.getElementById("accuracy");
let typeText = document.getElementById("type-text");
let textArea = document.getElementById("textarea");

let timeLeft = 0;
let timeElapsed = 0;
let errors = 0;
let accuracy = 0;
let typedCharacter = 0;
let timer = null;
let hasStarted = false;

initializeTest({ timeLimit: TIME_LIMIT, text: TEXT });

textArea.addEventListener("input", update);

function initializeTest({ timeLimit, text }) {
  for (char in text) {
    typeText.innerHTML += `<span>${text[char]}</span>`;
  }
  timerText.innerHTML = timeLimit;
  timeLeft = TIME_LIMIT;
}

function update() {
  if (!hasStarted) {
    timer = setInterval(updateTimer, 1000);
    hasStarted = true;
  }
  typedCharacter++;
  updateCharactersStatus();
  updateErrors();
  updateAccuracy();
}

function updateCharactersStatus() {
  let span = document.getElementsByTagName("span");
    for (char in textArea.value) {
      if (textArea.value[char] === span[char].innerText) {
        span[char].setAttribute("class", "correct-char");
      } else {
        span[char].setAttribute("class", "incorrect-char");
      }
    }
    for (let index = span.length-1; index >= textArea.value.length; index--) {
            span[index].removeAttribute("class");
    }
    errors = document.getElementsByClassName("incorrect-char").length;
}

function updateAccuracy() {
  accuracyText.textContent = Math.round(((typedCharacter - errors) / typedCharacter) * 100);
}

function updateErrors() {
    errorText.innerText = errors;
}

function updateWpm() {
  wpmText.textContent = Math.round(((typedCharacter / 5) / timeElapsed) * 60);
}

function updateTimer() {
    if(timeLeft > 0){
        timeLeft--;
        timeElapsed++;
        timerText.innerHTML = timeLeft;
        updateWpm();
    } else {
        finishTest();        
    }
}

function finishTest() {
    clearTimeout(timer);
    textArea.disabled = true;
}