// Create variables 
var triviaURL = "https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple"
game = "Halo"
key = "a799090a494c45c5b353265fd2772ec0"
var rawgIoURL = 'https://api.rawg.io/api/games?search=' + game + '&key=' + key;
// var platformsURL = 'https://api.rawg.io/api/platforms?&key=' + key
var genreURL = 'https://api.rawg.io/api/genres?&key=' + key
var gameURL = 'https://api.rawg.io/api/games?&key=' + key
var youtubeApiKey = "AIzaSyAwJ4Tla_g2vHjV5OuMWM6QpbxOVMMnz1k"
// var genreURL = 'https://api.rawg.io/api/genres/4?&key=' + key
// var youtubeURL = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + slugs + '&key=' + youtubeApiKey;
var cardboxElement = document.getElementById('cardBox')
var counter = 0;
formPanel = document.getElementById('formPanel')

// This function handles fetching based off genre
function genreFetch(genreURL) {
    fetch(genreURL)
        .then(function (response) {
            return response.json()

        }).then(function (data) {

            RenderCards(data)
        })
}
// This function handles fetching based off platform
function platformFetch(platformURL) {
    fetch(platformURL)
        .then(function (response) {
            return response.json()

        }).then(function (data) {

            RenderCards(data)

        })
}
// This function handles fetching on a specific game name
function gameFetch(gameURL) {

    fetch(gameURL)
        .then(function (response) {
            return response.json()

        }).then(function (data) {

            if (data.count == 0) {
                alert("not valid")
            }
            else {
                RenderCards(data)
            }
        })
}

// On page load we fetch using rawg.io API to generate card elements of games
fetch(gameURL)
    .then(function (response) {
        return response.json()

    }).then(function (data) {
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


            var div = document.createElement('div')

            div.innerHTML = `<div class="card m-3 bg-dark" style="width: 18rem;">
    <img class="card-img-top custom-height" src="${dimage}" alt="Card image cap">
        <div class="card-body m-3">
            <h5 class="card-title">${title}</h5>
            <p class="card-text hide">${genre}</p>
            <p class="card-text hide" id= "rating" data-star="${rating}">Rating: ${rating} </p>
            
            
            <p class="card-text hide">${platform}</p>
            <p class="card-text hide">${maturity}</p>
            <p class="card-text hide">${playable}</p>
            
            <p class="card-text .hide">${released}</p>
            <a href="#" class="btn btn-primary youtube-btn align-item-end hide" id="youtube-btn" data-slug="${data.results[i].slug}">YouTube </button></a>
        </div>
</div>`
            cardboxElement.append(div)
            addStar(div)

        }


    })
// This function handles grabs the data-attribute data-star and checks if the value is > 4.5
// if it meets the condition it appends the star icon to the html element
function addStar(data) {
    var starElemnt = `<i class=" fa fa-solid fa-star"></i>`

    for (var child of data.children) {
        console.log(child.children[1].children[2].getAttribute('data-star'))
        var star = child.children[1].children[2].getAttribute('data-star')
        if (star > 4.5) {
            console.log(data.children[0].children[1].children[2])
            data.children[0].children[1].children[2].innerHTML = star + " " + " " + starElemnt

        }

    }
}

var youtubeButton = document.getElementById('cardBox')
// This function listens for a button pressed in a cardbox element with a id of youtube-btn
// We grab the data-slug and use to the youtube API to fetch the corresponding data
// We format the data to JSON and parse the return data to grab the videoID
// After we then launch a youtube video related to the game 
youtubeButton.addEventListener('click', function (event) {

    if (event.target.id == 'youtube-btn') {

        var slugs = event.target.getAttribute("data-slug");

        var youtubeURLs = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + slugs + '&key=' + youtubeApiKey;
        fetch(youtubeURLs)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let videoid = data.items[0].id.videoId
                target = 'https://www.youtube.com/watch?app=desktop&v=' + videoid;
                window.open(target, '_blank')
            })
    }
});

var submit = document.getElementById('submit')

submit.addEventListener('click', function (event) {
    event.preventDefault()
    validateSearch()
})
// This function handles the search citeria
// We place a set of conditions so the user can only select one option per a search
// Depending on the condition we render platformFetch(), genreFetch() or gameFetch() functions
function validateSearch() {
    var genreOptions = document.getElementById('inputGroupSelect01').value
    var platformOptions = document.getElementById('inputGroupSelect02').value
    var searchGame = document.getElementById('searchGame').value
    if ((genreOptions !== "" && platformOptions !== "" && searchGame !== "") ||
        (genreOptions !== "" && platformOptions !== "" && searchGame == "")
        || (genreOptions !== "" && platformOptions == "" && searchGame !== "") ||
        (genreOptions == "" && platformOptions !== "" && searchGame !== "")) {
        alert("select one")
    }

    if (genreOptions == "" && platformOptions !== "" && searchGame == "") {
        var platformsURL = "https://api.rawg.io/api/games?key=a799090a494c45c5b353265fd2772ec0&platforms=" + platformOptions
        platformFetch(platformsURL)

    }
    if (genreOptions !== "" && platformOptions == "" && searchGame == "") {
        // var genreLink = 'https://api.rawg.io/api/genres/' + genreOptions + '?&key=' + key
        var genreLink = "https://api.rawg.io/api/games?key=a799090a494c45c5b353265fd2772ec0&genres=" + genreOptions
        genreFetch(genreLink)
    }
    if (searchGame !== "" && platformOptions == "" && genreOptions == "") {
        var gameURL2 = 'https://api.rawg.io/api/games?key=' + key + '&search=' + searchGame
        gameFetch(gameURL2)
    }
}

// This function handles parse the return data from Rawg.io's API and dynamically generating the html elements
function RenderCards(data) {
    cardboxElement.innerHTML = ""
    for (let i = 0; i < data.results.length; i++) {
        var title = data.results[i].name
        var dimage = data.results[i].background_image
        // genre is an array need to to get all platforms per game
        var genre = data.results[i].genres[0].name
        // platforms is an array need to to get all platforms per game`
        var platform = data.results[i].platforms[0].platform.name
        // var maturity = data.results[i].esrb_rating.name
        var maturity
        if (data.results[i].esrb_rating == null) {
            var maturity = "No rating"
        }
        else {
            var maturity = data.results[i].esrb_rating.name
        }
        // playable is an array need to to get all playable per game for single player or multiplayer
        var playable
        if (data.results[i].tags.length == 0) {
            var playable = "Not Found"
        }
        else {
            var playable = data.results[i].tags[0].name
        }

        var released = data.results[i].released
        var rating = data.results[i].rating
        var div = document.createElement('div')

        div.innerHTML = `<div class="card m-3 bg-dark" style="width: 18rem;">
    <img class="card-img-top custom-height" src="${dimage}" alt="Card image cap">
        <div class="card-body m-3">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${genre}</p>
            <p class="card-text hide"  id="stars"  data-star="${rating}" >Rating: ${rating}</p>
            
            <p class="card-text hide">${platform}</p>
            <p class="card-text hide">${maturity}</p>
            <p class="card-text hide">${playable}</p>
            
            <p class="card-text hide">${released}</p>
            <a href="#" class="btn btn-primary youtube-btn hide" data-slug="${data.results[i].slug}">YouTube </button></a>
        </div>
</div>`

        cardboxElement.append(div)
        addStar(div)
    }
    formPanel.reset()

}

// Launches the Trivia game
$('#toTrivia').on("click", function () {
    var newWindow = window.open();
    newWindow.document.location.href = "./quiz.html";
})
