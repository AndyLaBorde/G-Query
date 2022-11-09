var triviaURL = "https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple"
var QuestionArray = []

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
        renderCards()
    })

function renderCards(cc) {
    console.log(cc)
    var temp = cc
    if (temp == undefined) {
        temp = 0
    }
    console.log(temp)
    var cardBox = document.getElementById('searchContainer')
    console.log(QuestionArray)
    var question = QuestionArray[temp].questionD
    // console.log(question)
    // console.log(QuestionArray[0].choices)
    var choiceArray = QuestionArray[temp].choices

    choiceArray.forEach(element => {
        // element.slice(0, element.indexOf('['))
        console.log(element)
        const button = document.createElement("button");
        // button.classList.add("btn")
        button.innerText = element;
        cardBox.appendChild(button)
        button.addEventListener("click", function () {
            alert("hello")
            selectAnswer()
        });


    })
}

function selectAnswer() {
    console.log(counter)
    renderCards(counter++)
}
