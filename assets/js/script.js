// Create variables 
var triviaURL = "https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple"
game = "Halo"
key = "a799090a494c45c5b353265fd2772ec0"
var rawgIoURL = 'https://api.rawg.io/api/games?search=' + game + '&key=' + key;
var platformsURL = 'https://api.rawg.io/api/platforms?&key=' + key
var genreURL = 'https://api.rawg.io/api/genres?&key=' + key
var gameURL = 'https://api.rawg.io/api/games?&key=' + key
var QuestionArray = []
// console.log(platformsURL)
// var test = document.getElementById('cardBox')
// var div = document.createElement('div')
// var stringTest = "helllo World"
// div.innerHTML = `<div class="card" style="width: 18rem;">
//     <img class="card-img-top" src="..." alt="Card image cap">
//         <div class="card-body">
//             <h5 class="card-title">${stringTest}</h5>
//             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//             <a href="#" class="btn btn-primary">Go somewhere</a>
//         </div>
// </div>`
// test.append(div)
var counter = 0;
fetch(triviaURL)
    .then(function (response) {
        return response.json()

    }).then(function (data) {

        // console.log(data)
        for (let i = 0; i < data.results.length; i++) {
            // console.log(data.results[i])
            var question = data.results[i].question
            var correctAnswer = data.results[i].correct_answer
            var incorrecAnswerArray = []

            incorrecAnswerArray.push(data.results[i].incorrect_answers)

            QuestionArray.push({
                questionD: question,
                choices: [
                    choice = incorrecAnswerArray[0][0],
                    choice = incorrecAnswerArray[0][1],
                    choice = incorrecAnswerArray[0][2]
                ],
                answer: correctAnswer



            })


        }
        renderCards(QuestionArray)
    })

function renderCards(QuestionArray) {
    var cardBox = document.getElementById('searchContainer')
    console.log(QuestionArray)
    var question = QuestionArray[0].questionD
    // console.log(question)
    // console.log(QuestionArray[0].choices)
    var choiceArray = QuestionArray[0].choices

    choiceArray.forEach(element => {
        // element.slice(0, element.indexOf('['))
        console.log(element)
        const button = document.createElement("button");
        button.innerText = element;
        cardBox.appendChild(button)
        button.addEventListener("click", function () {
            alert("hello")
        });


    })
}


fetch(rawgIoURL)
    .then(function (response) {
        return response.json()

    }).then(function (data) {
        console.log(data)
    })
fetch(gameURL)
    .then(function (response) {
        return response.json()

    }).then(function (data) {
        // console.log(data)

        // console.log(data.results[0].name)

        for (let i = 0; i < data.results.length; i++) {

            var title = data.results[i].name
            var dimage = data.results[i].background_image
            // genre is an array need to to get all platforms per game
            var genre = data.results[i].genres[0].name
            // platforms is an array need to to get all platforms per game`
            var platform = data.results[i].platforms[0].platform.name
            var maturity = data.results[i].esrb_rating.name
            // playable is an array need to to get all playable per game for single player or multiplayer
            var playable = data.results[i].tags[0].name
            var released = data.results[i].released

            var rating = data.results[i].rating
            var test = document.getElementById('cardBox')
            var div = document.createElement('div')
            // console.log(title)
            div.innerHTML = `<div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${dimage}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${genre}</p>
            <p class="card-text" id="stars">${rating}</p>
            
            <p class="card-text">${platform}</p>
            <p class="card-text">${maturity}</p>
             <p class="card-text">${playable}</p>
             
              <p class="card-text">${released}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
</div>`
            test.append(div)





        }


    })

