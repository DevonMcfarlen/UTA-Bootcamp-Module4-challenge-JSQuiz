var btnGroup = document.querySelector(".btn-group");
var inCorrect = document.querySelector("#in-correct");
var headerText = document.querySelector('h1');
var headerInfo = document.querySelector('.lead');
var timeTracker = document.querySelector('#timer');
var highScoreInput = document.querySelector('form');
var highScoreSubmit = document.querySelector('#submitBtn');

var ansBtns = btnGroup.querySelectorAll('#answerBtn');
var currentQuestion = 0;
var currentTime = 90;
var timer;

var quiz = [
    ["1: Question text", "Answer Choice 1", "Answer Choice 2", "Answer Choice 3", "Answer Choice 4", "Answer Choice 3"],
    ["2: Question text", "Answer Choice 1", "Answer Choice 2", "Answer Choice 3", "Answer Choice 4", "Answer Choice 4"],
    ["3: Question text", "Answer Choice 1", "Answer Choice 2", "Answer Choice 3", "Answer Choice 4", "Answer Choice 2"],
    ["4: Question text", "Answer Choice 1", "Answer Choice 2", "Answer Choice 3", "Answer Choice 4", "Answer Choice 3"],
    ["5: Question text", "Answer Choice 1", "Answer Choice 2", "Answer Choice 3", "Answer Choice 4", "Answer Choice 1"],
];

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
    document.querySelector("#startBtn").style.display = "none";
    headerInfo.style.display = "none";
    btnGroup.setAttribute('class', 'btn-group-vertical col-2')

    setQuestion();
    timer = setInterval(timeKeeper, 1000);
}

function endQuiz() {
    clearInterval(timer);

    headerText.textContent = "All done!"

    inCorrect.textContent = "";
    for(var i = 0; i < ansBtns.length; i++){
        ansBtns[i].setAttribute('style', 'display:none');
    }

    highScoreInput.setAttribute('style', 'display: shown');
    headerInfo.setAttribute('style', 'display: shown');
    headerInfo.textContent = "Your final score is " + currentTime + ".";
}

function answerQuestion(answerPressed) {
    if(answerPressed.textContent === quiz[currentQuestion][5]){
        inCorrect.setAttribute('style', 'display: shown')
        inCorrect.textContent = "Correct!";
    }
    else {
        inCorrect.setAttribute('style', 'display: shown')
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

function handleButtonPress(event){
    if(event.target.id === "startBtn")
        startQuiz();
    else if(event.target.id === "answerBtn")
        answerQuestion(event.target);
}

function submitHighscore() {
    var userObject = {
        initials: highScoreInput[0].value,
        bestTime: currentTime
    };

    localStorage.setItem("userHighscore", JSON.stringify(userObject));
}

btnGroup.addEventListener("click", handleButtonPress);
highScoreSubmit.addEventListener("click", submitHighscore);