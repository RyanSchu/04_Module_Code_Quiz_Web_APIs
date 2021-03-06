// first select relevant elements
// get the card element which will store the question contents
var card = document.querySelector(".card")
var timer = document.querySelector(".timer")
var HSButton = document.querySelector("#toggle-scores")
var index = 0
var startScore = 0
var timeLeft=80
// first lets define a class of objects called questions
class Question {
    constructor(title, question, choices, solution,isStart,buttonContent) {
        if (!isStart) {
            if (!choices.includes(solution)){
                console.log("choices must include solution")
                return
            }
        }
        this.title = title
        this.question = question
        this.choices = choices
        this.solution = solution
        this.isStart = isStart
        this.buttonContent = buttonContent

    }
}

// class to record scores
class Score {
    constructor(name, score) {
        this.name = name
        this.score = score
    }
}

// this function adds the content to the page each time the continue button is clicked
function renderCard(card,question) {
    if(index !== 0 ){
        card.innerHTML = ''
    }
    renderTitle(card,question)
    renderQuestion(card,question)
    renderChoices(card,question)
    renderButton(card,question)
    card.setAttribute("data-index",index)
    return
}   

function renderTitle(card,question) {
    let cardHeader = document.createElement("h3")
    cardHeader.textContent = question.title
    card.appendChild(cardHeader)
    return
}

function renderQuestion(card,question) {
    let questionHeader = document.createElement("h2")
    questionHeader.setAttribute("class","card-header")
    questionHeader.textContent = question.question
    card.appendChild(questionHeader)
    return
}

function renderChoices(card,question) {
    let choiceForm = document.createElement("form")
    for (i = 0; i < question.choices.length; i++){
        let choice = document.createElement("input")
        choice.setAttribute("type","radio")
        choice.setAttribute("name","choice")
        choice.setAttribute("id","choice" + i)
        choice.setAttribute("class","btn-check")
        choice.setAttribute("value",question.choices[i])
        choiceForm.appendChild(choice)
        let label = document.createElement("label")
        label.setAttribute("for", "choice" + i)
        label.setAttribute("class", "btn btn-outline-secondary")
        label.textContent = question.choices[i]
        choiceForm.appendChild(label)
    }
    card.appendChild(choiceForm)
    return
}


function renderButton(card,question) {
    let cardButton = document.createElement("button")
    cardButton.setAttribute("class", "quizButton")
    cardButton.textContent = question.buttonContent
    if (question.buttonContent === "Start Quiz"){
        
        cardButton.addEventListener("click",function(){
            index++
            renderCard(card,questions[index])
            startTimer()
        }) 
    } else if (question.buttonContent === "Finish Quiz") {
        cardButton.addEventListener("click",function(){
            renderScoreForm(card)
            stopTimer(timerID)
        })
    } else {
        cardButton.addEventListener("click",function(){
            scoreQuestion(questions[index])
            renderCard(card,questions[index])
        })
    }
    card.appendChild(cardButton)
    return
}


// function to score questions
// this will be attached to the button event listener
function scoreQuestion(question){
    let answer =  document.querySelector("input:checked")
    console.log(answer.getAttribute('value'))
    console.log(question.solution)
    if (answer.getAttribute('value') === question.solution) {
        startScore++
    } else {
        timeLeft-=10
    }
    index++
}

// create score tracker element
function renderScoreForm(card) {
    card.innerHTML = ''
    let scoreForm = document.createElement("form")
    let label = document.createElement("label")
    let nameInput = document.createElement("input")
    let submitButton = document.createElement("button")
    submitButton.textContent = "Submit & View High Scores"
    nameInput.setAttribute("type","text")
    nameInput.setAttribute("id","name-input")
    label.textContent = "Name:"
    label.appendChild(nameInput)
    scoreForm.appendChild(label)
    scoreForm.appendChild(submitButton)
    card.appendChild(scoreForm)
    scoreForm.addEventListener("submit",function() {
        event.preventDefault()
        recordScore()
        renderScoreboard(card)
    })
}

// function to record scores on finish
function recordScore() {
    let scores = JSON.parse(localStorage.getItem("scores"))
    if (!scores) {
        scores=[]
    }
    let inputName = document.querySelector("#name-input").value
    let currentScore = new Score(name=inputName,score=startScore)
    scores.push(currentScore)
    localStorage.setItem("scores",JSON.stringify(scores))
    startScore=0
    clearInterval()
}


// Need function to show the high scores page
function renderScoreboard(card) {
    card.innerHTML = ''
    let resetButton = document.createElement("button")
    resetButton.textContent = "Retake Quiz"
    resetButton.addEventListener("click",function() {
        index=1
        renderCard(card,questions[index])
        startTimer()
    })
    let scoreBoard = document.createElement("ol")
    scoreBoard.setAttribute("type","1")
    scoreBoard.setAttribute("class","list-group list-group-numbered")
    let scores = JSON.parse(localStorage.getItem("scores"))
    scores.sort((a, b) => (b.score - a.score))
    // code to grab 
    for (i =0; i < scores.length && i < 10 ; i++){
        // console.log(scores[i])
        let item = document.createElement("li")
        item.setAttribute("class","list-group-item d-flex align-items-start")
        item.textContent = scores[i].name  + " with a score of "  + scores[i].score
        scoreBoard.appendChild(item)
    }
    card.appendChild(resetButton)
    card.appendChild(scoreBoard)
}

function startTimer() {
    let timeInterval = setInterval(function() {
        timeLeft--
        timer.textContent = "Timer: " + timeLeft
        if (timeLeft <= 0) {
            recordScore()
            renderScoreboard(card)
        }
    },1000)
    timer.setAttribute("timerID",timeInterval)
}

function stopTimer() {
    clearInterval(parseInt(timer.getAttribute('timerID')))
}

// store questions in objects and objects in an array
// will consider the welcome page a special case of question for the purposes of easy rendering
var questions = [
    new Question(title="",question="Welcome to the quiz",choices=[],solution=null,isStart=true,buttonContent="Start Quiz"),
    new Question(title="Question 1/5",question="JavaScript is an example of",choices=["coffee if it were a font","A high level programming language","a very fun way to spend your time","obscure and rarely useful"],solution="A high level programming language",isStart=false,buttonContent="Continue"),
    new Question(title="Question 2/5",question="DOM is short for",choices=["Dear Ole Mom","Dead on, mate","Department of Magic","Document Object Model"],solution="Document Object Model",isStart=false,buttonContent="Continue"),
    new Question(title="Question 3/5",question="in javascript, what takes precedence: global or local scope?",choices=["Global","Local"],solution="Local",isStart=false,buttonContent="Continue"),
    new Question(title="Question 4/5",question="bootstrap refers to",choices=["What you pull yourself up by","A front end framework designed to simplify styling webpages","a reptile endemic to south-east asia"],solution="A front end framework designed to simplify styling webpages",isStart=false,buttonContent="Continue"),
    new Question(title="Question 5/5",question="I can't be bothered to write this last question. It's A.",choices=["A","B","C","D"],solution="A",isStart=false,buttonContent="Finish Quiz")
]

var timerID = renderCard(card,questions[0]) 
HSButton.addEventListener("click", function(){
    event.preventDefault()
    stopTimer()
    renderScoreboard(card)
})
// console.log(timerID)