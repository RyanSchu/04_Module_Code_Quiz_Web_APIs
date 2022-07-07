// first select relevant elements
// get the card element which will store the question contents
var card = document.querySelector(".card")
var index = 0
var startScore = 0
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
        // console.log(index)
        card.innerHTML = ''
    }
    renderTitle(card,question)
    renderQuestion(card,question)
    renderChoices(card,question)
    renderButton(card,question)
    card.setAttribute("data-index",index)
    index++
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
        choice.setAttribute("value",question.choices[i])
        choiceForm.appendChild(choice)
        let label = document.createElement("label")
        label.setAttribute("for", "choice" + i)
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
    if (question.buttonContent === "Finish Quiz") {
        cardButton.addEventListener("click",function(){
            renderScoreForm(card)
        })
    } else if (question.buttonContent === "Start Quiz"){
        cardButton.addEventListener("click",function(){
            renderCard(card,questions[index])
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

// need function to check that question is filled out


// function to score questions
// this will be attached to the button event listener
function scoreQuestion(question){
    let answer =  document.querySelector("input:checked")
    if (answer.getAttribute('value') === question.solution) {
        startScore++
    }
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
}
// function to reset current score on finish

// Need function to show the high scores page
function renderScoreboard(card) {
    card.innerHTML = ''
    scoreBoard = document.createElement("ol")
    
    let scores = JSON.parse(localStorage.getItem("scores"))
    scores.sort((a, b) => (a.score - b.score))
    if (!scores) {
        scores=[]
    }
    if (scores.length < 10) {
        scores = padScores(scores)
    }
    // code to grab 
    for (i =0; i < 10; i++){
        item = document.createElement("li")
        item.textContent = scores[i] 
        scoreBoard.appendChild(item)
    }
    card.appendChild(scoreBoard)
}

function padScores(array,content=null,length) {
    for (i = 0 ; i < length; i++){
        array.push(content)
    }
    return array
}



// store questions in objects and objects in an array
// will consider the welcome page a special case of question for the purposes of easy rendering
var questions = [
    new Question(title="",question="Welcome to the quiz",choices=[],solution=null,isStart=true,buttonContent="Start Quiz"),
    new Question(title="Question 1/5",question="Hello",choices=["A","B","C","D"],solution="A",isStart=false,buttonContent="Continue"),
    new Question(title="Question 2/5",question="Hello",choices=["A","B","C","D"],solution="A",isStart=false,buttonContent="Continue"),
    new Question(title="Question 3/5",question="Hello",choices=["A","B","C","D"],solution="A",isStart=false,buttonContent="Continue"),
    new Question(title="Question 4/5",question="Hello",choices=["A","B","C","D"],solution="A",isStart=false,buttonContent="Continue"),
    new Question(title="Question 5/5",question="Hello",choices=["A","B","C","D"],solution="A",isStart=false,buttonContent="Finish Quiz")
]

renderCard(card,questions[0]) 
