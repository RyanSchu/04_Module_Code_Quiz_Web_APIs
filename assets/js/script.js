
var card =document.querySelector(".card")
// var cardHead =document.getElementsByClassName("card-header")
// var cardContent =document.getElementsByClassName("card-content")
// var cardFoot =document.getElementsByClassName("card-footer")


var questions = [
    {title:"Welcome",question:"",choices:[],solution:""},
    {title:"Question1",question:"",choices:[],solution:""},
    {title:"Question2",question:"",choices:[],solution:""},
    {title:"Question3",question:"",choices:[],solution:""},
    {title:"Question4",question:"",choices:[],solution:""}

]

function initializeCard(card) {
    console.log("run")
    let cardHeader= document.createElement("h2")
    cardHeader.setAttribute("class","card-header")
    cardHeader.textContent = "Welcome to the quiz"
    card.appendChild(cardHeader)
}

function renderCard() {

}





