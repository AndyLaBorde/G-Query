var triviaURL = "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple"
var timerEl = document.getElementById("timerText");
var questionArray = []
var scores = JSON.parse(localStorage.getItem("highScores")) || [];
var gameOverDiv = document.getElementById('gameOver');
var counter = 0
var correctCounter = 0
var playAgainDiv = document.getElementById('playAgainDiv')
var playAgain = document.getElementById('playAgain')
var questionDiv = document.getElementById('question-container');
var customQuizEl = document.getElementById("quizDiv");
var timeLeft = 75;
var startBtn = document.getElementById('startBtn');
// Fetching trivia API to grab data for generating trivia
fetch(triviaURL)
    .then(function (response) {
        return response.json()
    }).then(function (data) {
        // Looping through resultset from API and storing it into an Array of objects
        for (let i = 0; i < data.results.length; i++) {
            var question = data.results[i].question
            var correctAnswer = data.results[i].correct_answer
            var incorrecAnswerArray = []
            incorrecAnswerArray = data.results[i].incorrect_answers
            questionObject = {
                questionD: question,
                choices: [
                ]
                ,
                answer: correctAnswer
            }
            questionObject.choices.push(
                choice0 = incorrecAnswerArray[0],
                choice1 = incorrecAnswerArray[1],
                choice2 = incorrecAnswerArray[2],
                choice3 = data.results[i].correct_answer
            )
            questionArray.push(questionObject)
        }
    })
// start button click event will trigger the start of the game
startBtn.addEventListener("click", function () {
    questionDiv.classList.remove('hide');
    customQuizEl.classList.add('hide');
    // time interval decremeting 
    var timer = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = "Timer: " + timeLeft + " seconds remaining";
            timeLeft--;

        } else if (timeLeft === 1) {
            timerEl.textContent = "Timer: " + timeLeft + "second remaining";
            timeLeft--;
            // clearing interval if time runs out
        } else {
            timerEl.textContent = "Out of time!"
            // Use clearInterval() to stop the timer
            clearInterval(timer);
        }
        // clearing intervasl if user answers all the questions
        if (counter >= questionArray.length) {
            timerEl.textContent = "Finished with time to spare!";
            clearInterval(timer);
        }
        // Use clearInterval() to stop the timer

    }, 1000);
    // sends current index of questionArray to renderCards
    renderCards(counter);
})
// This function will take the current index of questionArray and generate the html for the current question and answer choices
function renderCards(index) {

    var answerButtonElement = document.getElementById('answers-btns')

    var question = questionArray[index].questionD
    var choiceArray = questionArray[index].choices
    var shuffledArray = choiceArray.sort((a, b) => 0.5 - Math.random())

    var questionElement = document.getElementById('questions')
    console.log(questionElement)
    console.log(questionArray[index])
    // regex to remove special characters from question
    var currentQuestion = question.replace(/[^a-zA-Z0-9 ]/g, '')
    questionElement.textContent = currentQuestion
    shuffledArray.forEach(element => {

        const button = document.createElement("button");
        button.innerText = element;
        button.classList.add('answerBtn');
        answerButtonElement.appendChild(button)
        button.addEventListener("click", function (event) {

            selectAnswers(event)
        });
    })
}
// This function listens to the user answer choice click event and increments the correctCounter
// This function also increments the current counter of questionArray and sends it back to rednerCards
function selectAnswers(event) {

    var selectAnswer = event.target.innerText
    if (selectAnswer !== questionArray[counter].answer) {
    }
    else {
        correctCounter++
    }
    var questionElement = document.getElementById('questions')
    questionElement.textContent = ""
    var buttonText = document.getElementById('answers-btns')
    buttonText.textContent = ""

    counter++
    if (questionArray[counter] === undefined) {
        gameOver();
    } else {
        renderCards(counter)
    }
}
// This function hides the questionDiv and calls CreateForm
function gameOver() {
    gameOverDiv.classList.remove('hide');
    questionDiv.classList.add('hide')
    createForm();
}
// Creation of the input form for user input 
function createForm() {
    // creates form element to hold input and submit button
    var createForm = document.createElement("form");
    createForm.setAttribute("id", "createForm");
    // create input element and provide attributes and styling
    var createInput = document.createElement("input");
    createInput.setAttribute("id", "createInput");
    createInput.setAttribute("name", "userName");
    createInput.setAttribute("placeholder", "Enter your initials...")
    // submit button for form
    var createBtn = document.createElement("button");
    createBtn.setAttribute("id", "createBtn");
    createBtn.setAttribute("type", "submit");
    createBtn.textContent = "Save your score!";
    var scoreDisplay = document.createElement('h1')
    scoreDisplay.setAttribute("id", "scoreHeader")
    scoreDisplay.textContent = "Congratulations! You got " + correctCounter + "/" + questionArray.length + " correct!"

    // appending created elements to page
    gameOverDiv.append(scoreDisplay)
    createForm.appendChild(createInput);
    createForm.appendChild(createBtn);
    gameOverDiv.appendChild(createForm);
    var submitBtn = document.getElementById("createBtn");
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        saveHighScore();
    });
}
// sets highscore object to local storages
function saveHighScore() {
    //set value of final score
    var finalScore = correctCounter / questionArray.length + timeLeft;
    var userName = document.getElementById("createInput").value;
    console.log("Username: " + userName);
    console.log("Score: " + finalScore);
    var highScoreObject = {
        initals: userName,
        score: finalScore,
    };
    scores.push(highScoreObject);
    localStorage.setItem("highScores", JSON.stringify(scores));
    viewHighScore();
}

// Retrieves local storage items and displays the sorted scores
function viewHighScore() {
    // highScores.innerHTML= "";
    playAgainDiv.classList.remove('hide')
    var hideForm = document.getElementById('createForm')
    var scoreHeader = document.getElementById('scoreHeader')
    hideForm.classList.add('hide')
    scoreHeader.classList.add('hide')
    var localScoresStorage = JSON.parse(localStorage.getItem("highScores")) || [];
    console.log(localScoresStorage);
    var finalScoresEl = document.getElementById('finalScoresDisplay');
    finalScoresEl.textContent = "HIGH SCORES:"
    var sorted = localScoresStorage;
    sorted.sort(function (a, b) {
        return b.score - a.score;
    });
    for (var i = 0; i < sorted.length; i++) {
        var scoresDiv = document.createElement("li");
        console.log(sorted[i]);
        scoresDiv.textContent = `${sorted[i].initals}: ${sorted[i].score}`;
        finalScoresEl.appendChild(scoresDiv);
    }
}
// reloads the page 
playAgain.addEventListener('click', function () {
    location.reload();
})