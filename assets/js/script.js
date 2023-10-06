var btnGroup = document.querySelector(".btn-group");
var inCorrect = document.querySelector("#in-correct");
var headerText = document.querySelector('h1');
var headerInfo = document.querySelector('.lead');
var timeTracker = document.querySelector('#timer');
var highScoreInput = document.querySelector('form');
var highScoreSubmit = document.querySelector('#submitBtn');
var showHighscoreBtn = document.querySelector('#showHighscore');
var highScoreTable = document.querySelector('ul');

var ansBtns = btnGroup.querySelectorAll('#answerBtn');
var currentQuestion = 0;
var currentTime = 90;
var timer;

var quiz = [
    ["1: How do you assign a variable?", "Variable i", "variable i", "var i", "Var i", "var i"],
    ["2: How do you give a variable data to store", "variable i = data", "Variable i = data", "Var i = data", "var i = data", "var i = data"],
    ["3: How do you log things to the console", "log.console()", "console.log()", "Console.log()", "Console.Log()", "console.log()"],
    ["4: How do you make a function", "function myFunction(){}", "Function myFunction()", "Function myFunction(){}", "function myFunction()", "function myFunction(){}"],
    ["5: How would you call a function with the name myFunction", "Function.myFunction()", "function.myFunction()", "myFunction()", "myFunction", "myFunction()"],
];

var highscores = [];

function timeKeeper() {
    currentTime--;
    timeTracker.textContent = "Time: " + currentTime;
}

function setQuestion() {
    var question = quiz[currentQuestion];
    headerText.textContent = question[0];

    for(var i = 0; i < ansBtns.length; i++){
        ansBtns[i].textContent = question[i+1];
        ansBtns[i].setAttribute('style', 'display:shown');
    }
}

function startQuiz() {
    document.querySelector("#startBtn").setAttribute('style', 'display: none');
    headerInfo.setAttribute('style', 'display: none');
    btnGroup.setAttribute('class', 'btn-group-vertical col-auto')

    setQuestion();
    timer = setInterval(timeKeeper, 1000);
}

function endQuiz() {
    clearInterval(timer);
    highScoreInput[0].value = null;

    headerText.textContent = "All done!"
    for(var i = 0; i < ansBtns.length; i++){
        ansBtns[i].setAttribute('style', 'display:none');
    }

    highScoreInput.setAttribute('style', 'display: shown');
    headerInfo.setAttribute('style', 'display: shown');
    headerInfo.textContent = "Your final score is " + currentTime + ".";
}

function answerQuestion(answerPressed) {
    if(answerPressed.textContent === quiz[currentQuestion][5]){
        inCorrect.setAttribute('style', 'display: shown');
        inCorrect.textContent = "Correct!";
    }
    else {
        inCorrect.setAttribute('style', 'display: shown');
        inCorrect.textContent = "Incorrect!";
        currentTime -= 10;
        timeTracker.textContent = "Time: " + currentTime;
    }
    
    currentQuestion++;

    if(currentQuestion < quiz.length)
        setQuestion();
    else
        endQuiz();
}

function showHighscore() {
    highScoreTable.setAttribute('style', 'display: shown');
    highScoreTable.innerHTML = "";
    headerInfo.setAttribute('style', 'display: none');
    inCorrect.setAttribute('style', 'display: none');
    highScoreInput.setAttribute('style', 'display: none');
    btnGroup.setAttribute('class', 'btn-group col-12 justify-content-center')
    document.querySelector("#startBtn").style.display = "none";
    for(var i = 0; i < ansBtns.length; i++){
        ansBtns[i].setAttribute('style', 'display:none');
    }
    btnGroup.querySelector('#goBackBtn').setAttribute('style', 'display: shown');
    btnGroup.querySelector('#clearBtn').setAttribute('style', 'display: shown');

    clearInterval(timer);
    currentTime = 90;
    currentQuestion = 0;
    timeTracker.textContent = "Time: " + currentTime;
    headerText.textContent = "High scores";

    var storedHighscores = JSON.parse(localStorage.getItem("userHighscores"));
    if(storedHighscores !== null)
        highscores = storedHighscores;

    for(var i = 0; i < highscores.length; i++) {
        var hs = document.createElement("li");
        hs.setAttribute('class', 'list-group-item');
        hs.textContent = highscores[i].initials + " - " + highscores[i].bestTime;
        highScoreTable.append(hs);
    }

}

function submitHighscore() {
    if(highScoreInput[0].value === "")
        inCorrect.textContent = "Please enter your Initials";
    else {
        inCorrect.textContent = "";

        var userObject = {
            initials: highScoreInput[0].value.toUpperCase(),
            bestTime: currentTime
        };

        
        var storedHighscores = JSON.parse(localStorage.getItem("userHighscores"));
        if(storedHighscores !== null)
            highscores = storedHighscores;

        highscores.push(userObject);

        localStorage.setItem("userHighscores", JSON.stringify(highscores));
        showHighscore();
    }
}

function goBack() {
    highScoreTable.setAttribute('style', 'display: none');
    btnGroup.querySelector('#goBackBtn').setAttribute('style', 'display: none');
    btnGroup.querySelector('#clearBtn').setAttribute('style', 'display: none');
    headerInfo.setAttribute('style', 'display: shown');
    headerInfo.innerHTML = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    headerText.innerHTML = "Coding Quiz Challenge";
    document.querySelector("#startBtn").setAttribute('style', 'display: shown');
    btnGroup.setAttribute('class', 'btn-group col-12 justify-content-center')
}

function clearHighscores() {
    localStorage.clear();
    highscores = [];
    goBack();
}

function handleButtonPress(event){
    if(event.target.id === "startBtn")
        startQuiz();
    else if(event.target.id === "answerBtn")
        answerQuestion(event.target);
    else if(event.target.id === "goBackBtn")
        goBack();
    else if(event.target.id === "clearBtn")
        clearHighscores();
}

btnGroup.addEventListener("click", handleButtonPress);
highScoreSubmit.addEventListener("click", submitHighscore);
showHighscoreBtn.addEventListener("click", showHighscore);