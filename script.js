
const wordEl         = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn   = document.getElementById('play-button');
const popup          = document.getElementById('popup-container');
const notification   = document.getElementById('letter-used-container');
const finalMessage   = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
  'spacemarine', 
  'mario', 
  'fantasy', 
  'cheetah', 
  'movie', 
  'imperial', 
  'ghost', 
  'typing'
];
//this can be a fetch request to a backend pulling from a database of different words available

let selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
console.log("Selected Word", selectedWord);

let   correctLetters        = [];
const wrongLetters          = [];
const keyLetterVarification = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


//Show Hidden Word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
    .split('')
    .map(letter => `
      <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
      </span>
      `)
    .join('')}
  `;
  
  //Used for Win Condition Comparison
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  console.log("THE WORD ELEMENT", innerWord);

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'WELL DONE, NO SHORT DROP AND QUICK STOP! :-)';
    popup.style.display = 'flex';
  }
}

//Show Notification of Second Letter used
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

//Display Wrong Letters in element
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p> Wrong </p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;
}

//Key Down Letter Selection
window.addEventListener('keydown', e => {
  console.log(e.code, e.code[3]);
  let keyStroke = e.code[3];
  if (keyLetterVarification.includes(keyStroke)) {
    const letterAcquired = keyStroke;

    //is the letter in selected word
    if (selectedWord.includes(letterAcquired)) {
      if (!correctLetters.includes(letterAcquired)) {
        correctLetters.push(letterAcquired);
        console.log("Letter added to Correct letters", letterAcquired);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letterAcquired)) {
        wrongLetters.push(letterAcquired);
        console.log("Letter Added to wrongLetters", letterAcquired);

        updateWrongLettersEl();
      }
    }
  }
});

displayWord();
