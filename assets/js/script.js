// first select relevant elements
// get the card element which will store the question contents
var card = document.querySelector(".card")

// first lets define a class of objects called questions
class Question {
    constructor(title, question, choices, solution, values) {
        if (!(choices.includes(solution))) {
            console.log(solution, choices)
            console.log("invalid input, solution must exist in choices")
            return
        }
        this.title = title
        this.question = question
        this.choices = choices
        this.solution = solution
        this.values = values
    }
}

// first we want to initialize the card with a welcome page and start button
// we could alternatively store the welcome greeting inside the array of questions
// but i would rather keep it a separate process since a welcome page lacks any kind of content and could have a different solution
function initializeCard(card) {
    console.log(card)
    console.log("run")
    let cardHeader = document.createElement("h2")
    cardHeader.setAttribute("class","card-header")
    cardHeader.textContent = "Welcome to the quiz"
    card.appendChild(cardHeader)
    let cardButton = document.createElement("button")
    cardButton.setAttribute("id", "startButton")
    cardButton.textContent = "Start Quiz"
    card.appendChild(cardButton)

}


// store questions in objects and objects in an array
var questions = [
    new Question(title="Question 1/5",question="",choices=["A","B","C","D"],solution="A"),
    new Question(title="Question 2/5",question="",choices=["A","B","C","D"],solution="A"),
    new Question(title="Question 3/5",question="",choices=["A","B","C","D"],solution="A"),
    new Question(title="Question 4/5",question="",choices=["A","B","C","D"],solution="A"),
    new Question(title="Question 5/5",question="",choices=["A","B","C","D"],solution="A")
]

initializeCard(card) 




