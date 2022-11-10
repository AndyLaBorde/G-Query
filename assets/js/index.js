// Create variables 
var triviaURL = "https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple"
game = "Halo"
key = "a799090a494c45c5b353265fd2772ec0"
var rawgIoURL = 'https://api.rawg.io/api/games?search=' + game + '&key=' + key;
var platformsURL = 'https://api.rawg.io/api/platforms?&key=' + key
var genreURL = 'https://api.rawg.io/api/genres?&key=' + key
var gameURL = 'https://api.rawg.io/api/games?&key=' + key
var youtubeApiKey = "AIzaSyAwJ4Tla_g2vHjV5OuMWM6QpbxOVMMnz1k"
// var genreURL = 'https://api.rawg.io/api/genres/4?&key=' + key
// var youtubeURL = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + slugs + '&key=' + youtubeApiKey;
var cardboxElement = document.getElementById('cardBox')
var counter = 0;
formPanel = document.getElementById('formPanel')

function genreFetch(genreURL) {

    fetch(genreURL)
        .then(function (response) {
            return response.json()

        }).then(function (data) {

            RenderCards(data)
        })
}
function platformFetch(platformURL) {
    fetch(platformURL)
        .then(function (response) {
            return response.json()

        }).then(function (data) {

            RenderCards(data)



        })
}
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


fetch(gameURL)
    .then(function (response) {
        return response.json()

    }).then(function (data) {

        console.log(data)
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
            <p class="card-text">${genre}</p>
            <p class="card-text" id="stars">${rating} </p>
            
            
            <p class="card-text hide">${platform}</p>
            <p class="card-text hide">${maturity}</p>
            <p class="card-text hide">${playable}</p>
            
            <p class="card-text .hide">${released}</p>
            <a href="#" class="btn btn-primary youtube-btn align-item-end hide" id="youtube-btn" data-slug="${data.results[i].slug}">YouTube </button></a>
        </div>
</div>`
            cardboxElement.append(div)

        }


    })
var youtubeButton = document.getElementById('cardBox')


youtubeButton.addEventListener('click', function (event) {

    if (event.target.id == 'youtube-btn') {

        var slugs = event.target.getAttribute("data-slug");
        console.log("slugs")

        var youtubeURLs = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + slugs + '&key=' + youtubeApiKey;
        fetch(youtubeURLs)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let videoid = data.items[0].id.videoId
                console.log(videoid)


                target = 'https://www.youtube.com/watch?app=desktop&v=' + videoid;
                console.log(target)
                window.open(target, '_blank')
            })
    }
});

var submit = document.getElementById('submit')

submit.addEventListener('click', function (event) {
    event.preventDefault()
    validateSearch()

})

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

        // var platformsURL = 'https://api.rawg.io/api/platforms?&key=' + key
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
            var playable = "None"
        }
        else {
            var playable = data.results[i].tags[0].name
        }

        var released = data.results[i].released

        var rating = data.results[i].rating

        var div = document.createElement('div')

        div.innerHTML = `<div class="card m-3 bg-dark" style="width: 18rem;">
    <img class="card-img-top" src="${dimage}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${genre}</p>
            <p class="card-text" id="stars">${rating}</p>
            
            <p class="card-text hide">${platform}</p>
            <p class="card-text hide">${maturity}</p>
              <p class="card-text hide">${playable}</p>
   
             
              <p class="card-text hide">${released}</p>
            <a href="#" class="btn btn-primary youtube-btn hide" id="youtube-btn" data-slug="${data.results[i].slug}">YouTube </button></a>
        </div>
</div>`
        cardboxElement.append(div)



    }
    formPanel.reset()


}