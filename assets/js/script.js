// first select relevant elements
// get the card element which will store the question contents
var card = document.querySelector(".card")
var index = 0

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

// this function adds the content to the page each time the continue button is clicked
function renderCard(card,question) {
    if(index !== 0 ){
        console.log(index)
        card.innerHTML = ''
    }
    renderTitle(card,question)
    renderQuestion(card,question)
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

function renderButton(card,question) {
    let cardButton = document.createElement("button")
    cardButton.setAttribute("class", "quizButton")
    cardButton.textContent = question.buttonContent
    if (question.buttonContent === "Finish Quiz") {
        cardButton.addEventListener("click",function(){
            renderScoreboard(card)
        })
        card.appendChild(cardButton)
    } else {
        cardButton.addEventListener("click",function(){
            renderCard(card,questions[index])
        })
    }
    card.appendChild(cardButton)
    return
}

// Need function to show the high scores page

function renderScoreboard(card) {
    card.innerHTML = ''
    scoreBoard = document.createElement("ol")
    
    let scores = localStorage.getItem()(scores)
    scores.sort((a, b) => (a.score - b.score))
    if (scores.length < 10) {
        scores = padScores()
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
    new Question(title="",question="Welcome to the quiz",choices=[],solution="",isStart=true,buttonContent="Start Quiz"),
    new Question(title="Question 1/5",question="Hello",choices=["A","B","C","D"],solution="A",isStart=false,buttonContent="Continue"),
    new Question(title="Question 2/5",question="Hello",choices=["A","B","C","D"],solution="A",isStart=false,buttonContent="Continue"),
    new Question(title="Question 3/5",question="Hello",choices=["A","B","C","D"],solution="A",isStart=false,buttonContent="Continue"),
    new Question(title="Question 4/5",question="Hello",choices=["A","B","C","D"],solution="A",isStart=false,buttonContent="Continue"),
    new Question(title="Question 5/5",question="Hello",choices=["A","B","C","D"],solution="A",isStart=false,buttonContent="Finish Quiz")
]

renderCard(card,questions[0]) 
