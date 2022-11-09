// Create variables 
var triviaURL = "https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple"
game = "Halo"
key = "a799090a494c45c5b353265fd2772ec0"
var rawgIoURL = 'https://api.rawg.io/api/games?search=' + game + '&key=' + key;
var platformsURL = 'https://api.rawg.io/api/platforms?&key=' + key
var genreURL = 'https://api.rawg.io/api/genres?&key=' + key
var gameURL = 'https://api.rawg.io/api/games?&key=' + key
var youtubeApiKey = "AIzaSyAwJ4Tla_g2vHjV5OuMWM6QpbxOVMMnz1k"
var QuestionArray = []
// var genreURL = 'https://api.rawg.io/api/genres/4?&key=' + key
// var youtubeURL = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + slugs + '&key=' + youtubeApiKey;

var counter = 0;

fetch(genreURL)
    .then(function (response) {
        return response.json()

    }).then(function (data) {
        console.log(data)
    })

// fetch(rawgIoURL)
//     .then(function (response) {
//         return response.json()

//     }).then(function (data) {
//         console.log(data)
//     })
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
            <a href="#" class="btn btn-primary youtube-btn" data-slug="${data.results[i].slug}">YouTube </button>>Go somewhere</a>
        </div>
</div>`
            test.append(div)





        }


    })
var youtubeButton = document.getElementById('cardBox')
// var test = document.getElementById('cardBox')

youtubeButton.addEventListener('click', function (event) {

    if (event.target.className == 'btn btn-primary youtube-btn') {

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
    var genreName = grabGenre()

})
function grabGenre() {
    var genreOptions = document.getElementById('inputGroupSelect01').value
    // console.log(genreOptions)
    return genreOptions
}