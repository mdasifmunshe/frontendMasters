const title = document.querySelector(".title");
const loader = document.querySelector(".loader");
const letters = document.querySelectorAll(".letter-box");
const ANSWER_LENGTH = 5;
const ROUNDS = 6;

async function init() {
  let currentGuess = "";
  let currentRow = 0;
  let done = false;
  let isLoader = true;

  // https://words.dev-apis.com/word-of-the-day?random=1
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split("");
  setLoader(false);
  isLoader = false;

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      // replace the last letter
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText =
      letter;
  }

  async function commit() {
    if (currentGuess.length !== ANSWER_LENGTH) {
      // do nothing
      return;
    }

    setLoader(true);
    isLoader = true;

    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });

    const resObj = await res.json();
    const validWord = resObj.validWord;

    setLoader(false);
    isLoader = false;

    if (!validWord) {
      markInvalidWord();
      return;
    }

    const guessParts = currentGuess.split("");
    const map = makeMap(wordParts);

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      // mark as correct
      if (guessParts[i] == wordParts[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] == wordParts[i]) {
        // do nothing
      } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
        // mark as close
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
        map[guessParts[i]]--;
      } else {
        // mark as wrong
        letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
      }
    }

    currentRow++;

    if (currentGuess === word) {
      // win
      alert("You Win!");
      title.classList.add("winner");
      done = true;
      return;
    } else if (currentRow === ROUNDS) {
      // loose
      alert(`You Loose! The Word was ${word}`);
      done = true;
    }

    currentGuess = "";
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
  }

  function markInvalidWord() {
    // mark as invalid
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");

      setTimeout(function timeOut() {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid");
      }, 10);
    }
  }

  document.addEventListener("keydown", function handleKeyPress(event) {
    if (done || isLoader) {
      // do nothing
      return;
    }

    const action = event.key;

    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function setLoader(isLoader) {
  loader.classList.toggle("show", isLoader);
}

function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }

  return obj;
}

init();
