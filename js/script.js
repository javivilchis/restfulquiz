var questionaire = [
     {
          id:1,
          question: "Web API supports which of the following?",
          a: "TCP",
          b: "HTTP",
          c: "Soap",
          d: "All of the above",
          answer: "d"
     },
     {
          id:2,
          question: "Question 2: Web API supports which of the following request/response data formats by default?",
          a: "JSON",
          b: "XML",
          c: "BSON",
          d: "All of he above",
          answer: "a"
     },
     {
          id:3,
          question: "Question 3: Which of the following .NET framework supports Web API?",
          a: ".NET 2.0",
          b: ".NET 3.0",
          c: ".NET 3.5",
          d: ".NET 4.0",
          answer: "d"
     },
     {
          id: 4,
          question: "Question 4: Which of the following statement is TRUE?",
          a: "Web API can be configured using web.config.",
          b: "Web API can only be configured by code.",
          c: "Web API can be configured using app.config.",
          d: "None of the above",
          answer: "d",
     },
     {
          id:5,
          question: "Question 5: Web API uses which of the following open-source library for JSON serialization?",
          a: "Json.NET",
          b: "JsonFormatter.NET",
          c: "GetJson.NET",
          d: "None of the above",
          answer: "d",
     },
     {
          id:6,
          question: "Question 6: Web API controller must be derived from the __________ class.",
          a: "Controller",
          b: "ApiController",
          c: "WebApiController",
          d: "WebController/label>",
          answer: "c"
     },
     {
          id:7,
          question: "Question 7: Which of the following types of routing is supported in Web API?",
          a: "Attribute Routing",
          b: "Convention-based Routing",
          c: "All of the above",
          d: "None of the above",
          answer: "a"
     },
     {
          id:8,
          question: "Question 8: Which of the following types are valid response types of Web API action method?",
          a: "HttpResponseMessage",
          b: "IHttpActionResult",
          c: "Custom types",
          d: "All of the above",
          answer: "d"
     },
     {
          id:9,
          question: "Question 9: Which of the following action method names are valid to handle HTTP GET request?",
          a: "Get()",
          b: "GetAllStudents()",
          c: "GetStudent()",
          d: "All of the above",
          answer: "d"
     },
     {
          id:10,
          question: "Question 10: Web API sends which of the following status code on successful execution?",
          a: "200",
          b: "201",
          c: "500",
          d: "404",
          answer: "a"
     },
];

var question = document.getElementById("question");
var answers = Array.from(document.getElementsByClassName("answer-text"));
var questionCounterText = document.getElementById("counter");
var scoreText = document.getElementById("score");
var timerCount = document.getElementById("countdown");
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var startQuiz = document.getElementById("startquiz");
var quizHolder = document.getElementById("open");
var results = document.getElementById("results");
var resultScore = document.getElementById("resultscore");
var replay = document.getElementById("play");
var initials = document.getElementById('initials');
var submitPlayer = document.getElementById("submitPlayer");
var version = document.getElementsByClassName("version");

var questionCounter;
var score;
var max_questions = 5;
var timerFlag;
var acceptingAnswers;
var gameEnded;

//start the show
function init(){
     //opening page
     quizHolder.classList.add("hide");
     if(gameEnded){
          quiz.classList.add("hide");
          results.classList.remove("hide");
          clearInterval(yourtime);
     }else{
          quiz.classList.remove("hide");
          results.classList.add("hide");
          startGame();
     }
}

function startGame(){
     questionCounter = 0;
     score = 0;
     yourtime = 60;
     acceptingAnswers = true;
     availableQuestions = getRandomQuestions(questionaire, max_questions);

     countdown();

     getNewQuestion();
}
function countdown() {
     var timeLeft = yourtime;

     var timeInterval = setInterval(function () {
       if (timeLeft > 1) {
         timerCount.innerText = timeLeft + ' seconds remaining';
         timeLeft--;
       } else if (timeLeft === 1) {
         timerCount.innerText = timeLeft + ' second remaining';
         timeLeft--;
       } else {
         timerCount.textContent = 'you ran out of time';
         clearInterval(timeInterval);
         timerFlag = 0;
         quiz.classList.add("hide");
         results.removeAttribute("class", "hide");
         gameEnded = true;
         displayResults();
         return;
       }
     }, 1000);
     return timeLeft;
   }
function getRandomQuestions(arr, n){
     var len = arr.length;
     if(n > len){
          throw new RangeError(
               "getRandomQuestions: more elements taken than availble"
          );
     }

    //nifty randomizer function
     function randomizer(a,b){
          return 0.5 - Math.random();
     }
     var shuffled = arr.sort(randomizer);
     selected = shuffled.slice(0,n);
    
     // return the selected from 0 - total of questions from array.
     return selected;

}

//get the questions
function getNewQuestion(){
     
     //check to see if there are no more questions
     if(availableQuestions.length === 0 || timerFlag === 0){
          quiz.classList.add("hide");
          results.removeAttribute("class", "hide");
          gameEnded = true;
          return;
     }
     //set the questin counter
     questionCounter++;
     //display question counter
     questionCounterText.innerText = `${questionCounter}/${max_questions}`;
     //get the current question and display it.
     currentQuestion = availableQuestions[0];
     question.innerText = currentQuestion.question;

     // iterate through the answers available
     function iterate(answer) {
     //write to the selection section
          answer.innerText = currentQuestion[answer.dataset["answer"]];
     }
     answers.forEach(iterate);

     // add randomization
     answers.forEach(function(answer){ 
          answer.addEventListener("click", function(e){
          if(!acceptingAnswers){
               //console.log("not accepting answers");
               return; //bail
          }
          // set a flag to stop from selecting other answers.
          acceptingAnswers = false;
          var clickedAnswer = e.target;
          // console.log("clicked answer");
          // console.log(clickedAnswer);
          var answerLetter = clickedAnswer.dataset["answer"];
          // console.log("answer letter");
          // console.log(answerLetter);

          var classToApply = "incorrect";

          if(answerLetter === currentQuestion.answer){
               // update the score if answer is correct
               // add a class to the clicked element.
               score++;
               scoreText.innerText = score;
               classToApply = "correct";
          }
          clickedAnswer.parentElement.classList.add(classToApply);
/*
          function setTimeout(){
               //reset items and get a new question.
               clickedAnswer.parentElement.classList.remove(classToApply);
               getNewQuestion();
               acceptingAnswers = true;
          };
          //setTimeout to one second
          setTimeout(setTimeout,1000);
          */
         setTimeout(() => {
          clickedAnswer.parentElement.classList.remove(classToApply);
          getNewQuestion();
          acceptingAnswers = true;
         }, 1000);
     });
    
     });
availableQuestions.shift();
};

function displayResults(){
     console.log(resultScore);
     resultScore.innerHTML = `You scored: ${score}`;
     gameEnded = true;
     acceptingAnswers = false;
     renderMessage();
}
startQuiz.addEventListener("click", init);
//replay.addEventListener("click", init);

var today = new Date();
var date = (today.getMonth()+1)+ "/" + today.getDate() + "/" +today.getFullYear() ;

submitPlayer.addEventListener("click", function(event) {
     event.preventDefault();
     var playerCard = {
          player: initials.value,
          score: `${score}`,
          date: date,
     };
   
   localStorage.setItem("playerCard", JSON.stringify(playerCard));
   renderMessage();

});

function renderMessage() {
var lastPlayer = JSON.parse(localStorage.getItem("playerCard"));
if (lastPlayer !== null) {

     document.querySelector(".highscores").textContent = lastPlayer.player +  " scored: " + lastPlayer.score + " On: " + lastPlayer.date
}
}
version.textContent(date);