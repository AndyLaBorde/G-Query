var triviaURL = "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple"
var questionArray = []
var counter = 0
var correctCounter = 0
fetch(triviaURL)
    .then(function (response) {
        return response.json()

    }).then(function (data) {

        // console.log(data)
        for (let i = 0; i < data.results.length; i++) {
            // console.log(data.results[i])
            var question = data.results[i].question
            console.log(question)
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

    var startBtn = document.getElementById('startBtn');
    startBtn.addEventListener("click", function() {
        renderCards(counter)
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
    if (questionArray[counter] == undefined) {
        gameOver() } else {
    renderCards(counter)
    }
}

function gameOver() {
    console.log(gameOver)
    alert("Congratulations! You got " + correctCounter + "/" + questionArray.length + " correct!")

    
    }

