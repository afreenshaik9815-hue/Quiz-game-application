const questions = [
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "Delhi", correct: true },
            { text: "Chennai", correct: false },
            { text: "Kolkata", correct: false }
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "Which company developed Java?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Sun Microsystems", correct: true },
            { text: "Google", correct: false },
            { text: "Apple", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML =
        (currentQuestionIndex + 1) + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");

        button.innerHTML = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        score++;
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();

    questionElement.innerHTML =
        `You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();