const quizData = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correct: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style System"],
        correct: "Cascading Style Sheets"
    },
    {
        question: "Which tag is used to include JavaScript?",
        options: ["js", "script", "javascript", "code"],
        correct: "script"
    },
    {
        question: "Which company developed React?",
        options: ["Google", "Microsoft", "Facebook", "Amazon"],
        correct: "Facebook"
    },
    {
        question: "Which property changes text color in CSS?",
        options: ["font-color", "text-color", "color", "background"],
        correct: "color"
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.innerText = current.question;
    optionsEl.innerHTML = "";

    current.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => selectAnswer(option);
        optionsEl.appendChild(btn);
    });

    nextBtn.style.display = "none";
}

function selectAnswer(selected) {
    if (selected === quizData[currentQuestion].correct) {
        score++;
    }
    nextBtn.style.display = "block";
}


nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById("quiz-box").classList.add("hide");
    document.getElementById("result-box").classList.remove("hide");
    document.getElementById("score").innerText =
        score + " / " + quizData.length;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("result-box").classList.add("hide");
    document.getElementById("api-box").classList.add("hide");
    document.getElementById("quiz-box").classList.remove("hide");
    loadQuestion();
}

function showLoading(title) {
    document.getElementById("api-box").classList.remove("hide");
    document.getElementById("api-title").innerText = title;
    document.getElementById("api-content").innerText = "Loading...";
}

function showData(title, content) {
    document.getElementById("api-title").innerText = title;
    document.getElementById("api-content").innerText = content;
}

function showError() {
    document.getElementById("api-content").innerText =
        "Failed to load data. Please try again.";
}

async function getFact() {
    showLoading("Fun Fact");

    try {
        const res = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
        const data = await res.json();
        showData("Fun Fact 🤓", data.text);
    } catch (error) {
        showError();
    }
}

async function getJoke() {
    showLoading("Random Joke");

    try {
        const res = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await res.json();
        showData("😂 Joke", data.setup + " — " + data.punchline);
    } catch (error) {
        showError();
    }
}

loadQuestion();