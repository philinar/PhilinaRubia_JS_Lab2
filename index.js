function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionNumber = 0;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}


Quiz.prototype.getquestionNumber = function () {
    return this.questions[this.questionNumber];
}

Quiz.prototype.isEnded = function () {
    return this.questionNumber === this.questions.length;
}

Quiz.prototype.checkAnswer = function (answer) {
    if (this.getquestionNumber().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionNumber++;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}

function handleClickedBtn(btnNumber, choice) {
    var button = document.getElementById(btnNumber);
    button.onclick = function () {
        quiz.checkAnswer(choice);
        loadQuestions();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionNumber + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScore() {
    var result = "<h1>Result</h1>";
    result += "<h2 id='score'> Your score is " + quiz.score + " and your percentage is " + (quiz.score / questions.length * 100) + "%" + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = result;
};

function loadQuestions() {
    if (quiz.isEnded()) {
        showScore();
    }
    else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getquestionNumber().text;
        var choices = quiz.getquestionNumber().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            handleClickedBtn("btn" + i, choices[i]);
        }

        showProgress();
    }
};

var questions = [
    new Question("CSS stands for", ["Cascade style sheets", "Color and style sheets", "Cascading style sheets", "None of the above"], "Cascading style sheets"),
    new Question("The property in CSS used to change the text color of an element is ", ["bgcolor", "color", "background-color", "All of the above"], "color"),
    new Question(" The CSS property used to control the element's font-size is", ["text-style", "text-size", "font-size", "None of the above"], "font-size"),
    new Question("The HTML attribute used to define the inline styles is", ["style", "styles", "class", "None of the above"], "style"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];


var quiz = new Quiz(questions);

loadQuestions();