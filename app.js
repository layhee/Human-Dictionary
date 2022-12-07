////////////////////////
// input -> process -> output
////////////////////////

////////////////////////
// constant and variables
////////////////////////

//wrapped api call and word display into a button click
$('#new-word').click(function(){
    let randomPull
    let $wordDisplay = $('.word-display');
    let $partOfSpeech = $('.pos');
    let $ansDiv = $('.ans-div');
    let $form = $('form')
    let $input = $( 'input[type="text"]' )
    let $etymology = $('.etymology')

    //rapid api call for random word
    let random = {
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
        let htmlPos = newWord.map(function(word) {
            return `${word.fl}`
        })[0]
        let htmlWord = newWord.map(function(word) {
            return `${word.shortdef}`
        })
        let htmlEtymology = newWord.map(function(word) {
            return `${word.et}`
        })[0]
        $partOfSpeech.html('<span style="color:#464646;font-size:1.2rem;line-height:72px;font-style:italic;">part of speech: </span> <span style="padding: 12px 12px; background-color: #454545; color: #fff; border-radius:8px;">' + htmlPos)
        $wordDisplay.html('<span style="font-style:italic;color:#464646;font-size:1.2rem;">definition: </span>' + htmlWord)
        $etymology.html('<span style="color:#464646;font-size:1.2rem;font-style:italic;">etymology: </span>' + htmlEtymology)
    }
    // function hint(newWord){
    //     let htmlEtymology = newWord.map(function(word) {
    //         return `${word.et}`
    //     })[0]
    //     $etymology.html('<div id="etymology">' + htmlEtymology + '</div>')
    // }
    // hint()
    //when form button is pushed, this gets user's guess (input)
    //and tells you if you're right or if you're wrong
    //and displays your guess below the form.
    $form.on('submit', handleGetData)

    function handleGetData(event) {
        userInput = $input.val()
        if(userInput === '') return;
        $input.val('')   
        event.preventDefault();
        console.log(userInput);
        return (userInput === randomPull ? $ansDiv.html('<div style="display:flex;flex-direction:column;align-items:center;">Nice!<span style="padding: 16px 24px;margin: 6px 0;background-color:#ffc21c; color: #464646; border-radius:8px;text-transform:uppercase;">' + randomPull + ' is the right answer!</span><a onClick="window.location.reload();">Click here to start over!</a></div>') :  $ansDiv.html('<span style="padding: 12px 12px; background-color: #454545; color: #fff; border-radius:8px;">' + userInput + ' is the wrong answer</span>'))
    }

    handleGetData($ansDiv.html(''));
})