////////////////////////
// input -> process -> output
////////////////////////

////////////////////////
// constant and variables
////////////////////////

$('#new-word').click(function(){
    let randomPull
    const $wordDisplay = $('.word-display');
    const $partOfSpeech = $('.pos');
    const $ansDiv = $('.ans-div');
    const $form = $('form')
    const $input = $( 'input[type="text"]' )

    //rapid api call for random word
    const random = {
        "async": true,
        "crossDomain": true,
        "url": "https://random-words5.p.rapidapi.com/getRandom",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "a330d26befmsh104b7d47ec2b7fdp14c216jsn4c5454995ef8",
            "X-RapidAPI-Host": "random-words5.p.rapidapi.com"
        }
    }
    ////////////////////////
    // cache DOM elements
    ////////////////////////

    ////////////////////////
    //register event listeners
    ////////////////////////


    ////////////////////////
    // FUNCTIONS
    ////////////////////////

    //this calls in a random word from frist API and plugs it into
    //second API to pull its' definition and part of speech. 
    $.ajax(random).then(function (randomResponse) {
        randomPull = randomResponse
        console.log(randomResponse)
        $.ajax({
            url: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${randomPull}?key=12da27b6-953a-4c4f-9273-78ace33cdddd`,
        }).then(
            (data) => {
                console.log(data);
                displayWord(data)
                },
                (error) => {
                console.log("bad request: ", error);
                }
        )
    }); 

    // display randomly generated definition and part of speech
    function displayWord(newWord){
        const htmlPos = newWord.map(function(word) {
            return `${word.fl}`
        })[0]
        const htmlWord = newWord.map(function(word) {
            return `${word.shortdef}`
        })
        $partOfSpeech.html(htmlPos)
        $wordDisplay.html(htmlWord)
    }

    //when form button is pushed, this gets user's guess (input)
    //and tells you if you're right or if you're wrong, it tells you
    //and displays your guess below the form.
    $form.on('submit', handleGetData)

    function handleGetData(event) {
        userInput = $input.val()
        if(userInput === '') return;
        $input.val('')   
        event.preventDefault();
        // return ($input === userInput ? $ansDiv.html(userInput + ' is the right answer!') : $ansDiv.html(userInput + ' is the wrong answer'))
        if ($input == $wordDisplay){
            $ansDiv.html(userInput + ' is the right answer!')
        }else{
            $ansDiv.append(userInput + ' is the wrong answer')
        }
    }

    handleGetData();
})