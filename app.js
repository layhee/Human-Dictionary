// input -> process -> output

// constant and variables

const promise =  $.ajax({
  url: "https://www.dictionaryapi.com/api/v3/references/collegiate/json/amalgamation?key=12da27b6-953a-4c4f-9273-78ace33cdddd",
})

// cache DOM elements
const $wordDisplay = $('.word-display');

//register event listeners

// functions

promise.then(
  (data) => {
    displayWord(data)
  },
  (error) => {
    console.log("bad request: ", error);
  }
);

function displayWord(newWord){
    const htmlWord = newWord.map(function(word) {
        return `${word.shortdef}`;
    })
    $wordDisplay.html(htmlWord);
}
