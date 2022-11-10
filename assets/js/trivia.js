var triviaURL = "https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple"
var questionArray = []
var counter = 0
fetch(triviaURL)
    .then(function (response) {
        return response.json()

    }).then(function (data) {

        console.log(data)
        for (let i = 0; i < data.results.length; i++) {
            // console.log(data.results[i])
            var question = data.results[i].question
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
        renderCards()
    })

function renderCards(cc) {

    var temp = cc
    if (temp == undefined) {
        temp = 0
    }
    // console.log(temp)
    var answerButtonElement = document.getElementById('answers-btns')
    // console.log(QuestionArray)
    var question = questionArray[temp].questionD
    var choiceArray = questionArray[temp].choices
    var question = document.getElementById('questions')
    question.textContent = questionObject.questionD.replace(/[^a-zA-Z0-9 ]/g, '')
    choiceArray.forEach(element => {
        // console.log(element)
        const button = document.createElement("button");
        button.innerText = element;
        answerButtonElement.appendChild(button)
        button.addEventListener("click", function (event) {

            selectAnswer(event)
        });


    })
}

function selectAnswer(event) {
    // console.log(event.target.innerText)
    var selectAnswer = event.target.innerText
    if (selectAnswer !== questionArray[counter].answer) {
        console.log(selectAnswer + " Wrong : " + ":" + questionArray[counter].answer)
    }
    else {
        console.log("Correct : " + questionArray[counter].answer)
    }
    var question = document.getElementById('questions')
    // question.textContent = ""
    var buttonText = document.getElementById('answers-btns')
    buttonText.textContent = ""
    // console.log(counter)
    renderCards(counter++)
}

function nextQuestion() {
    if (questionArray[counter] == undefined) {
        console.log("gameover")
    }
}
