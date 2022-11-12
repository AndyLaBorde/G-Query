var triviaURL = "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple"
var timerEl = document.getElementById("seconds");
var questionArray = []
var scores = JSON.parse(localStorage.getItem("highScores")) || [];
var gameOverDiv = document.getElementById('gameOver');
var counter = 0
var correctCounter = 0
var questionDiv = document.getElementById('question-container');
var customQuizEl = document.getElementById("quizDiv");
fetch(triviaURL)
    .then(function (response) {
        return response.json()

    }).then(function (data) {

        // console.log(data)
        for (let i = 0; i < data.results.length; i++) {
            // console.log(data.results[i])
            var question = data.results[i].question
            // console.log(question)
            var correctAnswer = data.results[i].correct_answer
            var incorrecAnswerArray = []

            incorrecAnswerArray = data.results[i].incorrect_answers
            // console.log(incorrecAnswerArray)


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
            // console.log(questionObject)
            questionArray.push(questionObject)

        }
        // renderCards()
    })
    var timeLeft = 75;

    var startBtn = document.getElementById('startBtn');
    startBtn.addEventListener("click", function() {
        
        questionDiv.classList.remove('hide');
        customQuizEl.classList.add('hide');

        var timer = setInterval(function() {
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

    renderCards(counter); 
    })
    
        function renderCards(cc) {
            console.log(cc)
        var temp = cc
        if (temp == undefined) {
            temp = 0
        }
        // // console.log(temp)
        var answerButtonElement = document.getElementById('answers-btns')
        // console.log(QuestionArray)
        var question = questionArray[temp].questionD
        var choiceArray = questionArray[temp].choices
        var questionElement = document.getElementById('questions')
        console.log(questionElement)
        console.log(questionArray[cc])
        var currentQuestion = question.replace(/[^a-zA-Z0-9 ]/g, '')
        questionElement.textContent = currentQuestion
        choiceArray.forEach(element => {
            // console.log(element)
            const button = document.createElement("button");
            button.innerText = element;
            button.classList.add('answerBtn');
            answerButtonElement.appendChild(button)
            button.addEventListener("click", function (event) {
    
                selectAnswers(event)
            });
    
    
        })
    }


function selectAnswers(event) {
    // console.log(event.target.innerText)
    var selectAnswer = event.target.innerText
    if (selectAnswer !== questionArray[counter].answer) {
        console.log(selectAnswer + " Wrong : " + ":" + questionArray[counter].answer)
    }
    else {
        console.log("Correct : " + questionArray[counter].answer)
        correctCounter++
    }
    var questionElement = document.getElementById('questions')
    console.log(questionElement)
    questionElement.textContent = ""
    var buttonText = document.getElementById('answers-btns')
    buttonText.textContent = ""
    // console.log(counter)
    counter++
    if (questionArray[counter] === undefined) {
        gameOver();
    } else {
        renderCards(counter)
    }
}

function gameOver() {
    gameOverDiv.classList.remove('hide');
    alert("Congratulations! You got " + correctCounter + "/" + questionArray.length + " correct!")

    createForm();
    }
    
function createForm(){
        
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
        
        // appending created elements to page
        createForm.appendChild(createInput);
        createForm.appendChild(createBtn);
        gameOverDiv.append(createForm);

        var submitBtn = document.getElementById("createBtn");
        submitBtn.addEventListener("click", function(event){
            event.preventDefault();
            saveHighScore();
        });
}

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

function viewHighScore() {
    // highScores.innerHTML= "";
    
    var localScoresStorage = JSON.parse(localStorage.getItem("highScores")) || [];
    console.log(localScoresStorage);
    var finalScoresEl = document.getElementById('finalScoresDisplay');
    finalScoresEl.textContent = "HIGH SCORES:"

    var sorted = localScoresStorage;
    sorted.sort(function (a,b){
        return b.score -a.score;
    });

    for (var i = 0; i < sorted.length; i++) {
    var scoresDiv = document.createElement("li");

    console.log(sorted[i]);
    scoresDiv.textContent = `${sorted[i].initals}: ${sorted[i].score}`;
    
    finalScoresEl.appendChild(scoresDiv);
    }
    
}