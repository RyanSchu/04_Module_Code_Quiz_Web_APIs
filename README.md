# 04_Module_Code_Quiz_Web_APIs

## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## Developer Notes

### Pseudocode - js

```
should also have a an init function that initializes the page with the start button content

#WHEN I click the start butto
start buttonn - this will actually be a div with clickable boxes internally to match the mockup, not separate button elements but will be referrred to as buttons
buttons should contain the answer or score within their data attribute
(?) wonder if there is a way to shuffle the order of the buttons everytime the page is loaded - seed based on internal clock time ? shuffling should be determined here


#THEN a timer starts and I am presented with a question
on click/submit function should start timer (setInterval) - make separate function (start timer function)
starts the chain of questions
(?) wonder if its possible to shuffle the order of the questions 

#WHEN I answer a question THEN I am presented with another question
answer buttons also need to have a function that progresses the questions, - increases index by one and sets attributes to adjust the questions? 
questions should be stored in an array - current index should be kept track of

#WHEN I answer a question incorrectly THEN time is subtracted from the clock
event trigger should also return the answer or score of the chosen button - (fetch score function)
the returned value is used to adjust the timer (adjust timer function)

#WHEN all questions are answered or the timer reaches 0 THEN the game is over
if timerCount == 0 then triggerGameOver function
if question == final question then triggerGameOver function
game over function should change the content to the game over content including submit form
submit form should store initials and corresponding scores in local storage

The acceptance criteria doesn't actually say anything about the high score display - we will save this phase for last but we generally want another button with an event listener that triggers 

```

### Link to application

https://ryanschu.github.io/04_Module_Code_Quiz_Web_APIs/
