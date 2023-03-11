const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

const question = document.querySelector('#questions-bloc .question');
const slider = document.querySelector('#questions-bloc .slider input');

const progressBar = document.querySelector('#content .progress-done');
const questionsBloc = document.getElementById('questions-bloc');
var shareButton;

const qsList = ["Q1) Je m'immisce dans les échanges pour lesquels je n'ai point été convié",
    "Q2) Je m'exprime à propos de sujets qui peuvent être jugés insignifiants à l'oreille d'interlocuteurs qui n'y portent manifestement aucun intérêt",
    "Q3) Je fais étalage de mes qualités et me présente sous un jour avantageux dans mes échanges verbaux."];
const statusList = ["Normal", "Tendances PNJ", "PNJ modéré", "Vrai PNJ", "Giga PNJ"];
const dcpList = ["Rien à signaler, t'es un gars tout à fait normal. Tu croques la vie à pleine temps sans te cringer.",
    "T'as l'air plutôt normal. Tu peux t'égarer quelques fois, mais rien d'alarmant. Continue dans cette voie.",
    "Attention ! Tu commences à prendre des aises. Tu te moques en peu des conventions, sans pour autant être impudent. Il faut savoir trouver un juste milieu entre amusement et débilité.",
    "Là ça devient grave. Tu dois te préoccuper du regard des autres, et surtout les respecter. C'est bien de vivre sa best life, mais pas trop quand même. Il ne faudrait pas tomber dans la marginalité.",
    "C'est fichu, irrattrapable, c'est certain que t'es officiellement un PNJ. Tu cringe sûrement les autres sans t'en rendre compte. 2 solutions s'offrent à toi : continuer à vivre ta vie oklm ; ou céder aux exigences sociales. Fais ton choix !"]
const citList = ["« La société veut des citoyens, elle ne veut pas des hommes. » - Oscar Wilde",
    "«La normalité est une route pavée : on y marche aisément mais les fleurs n'y poussent pas. - Vincent Van Gogh»",
    "«La société veut des moutons, elle trouvera toujours un berger.» - Michel Audiard",
    "«Dans la vie, il n'y a qu'une chose qui soit vraiment importante : c'est de décider ce que l'on veut faire de sa vie. Une fois que l'on a compris cela, il ne reste plus qu'à se mettre au travail pour y arriver.» - Winston Churchill",
    "«Les conventions sont des inventions humaines et rien ne nous oblige à les suivre aveuglément.» - Bertrand Russell",
    "«Dans toute société, il y a des normes qui façonnent les comportements, mais la créativité vient de ceux qui savent briser ces normes et faire les choses différemment.» - Quelqu'un"]
var statusIndex;
var qsIndex = 0; question.innerText = qsList[qsIndex];
var scoreList = []; initScoreList();
var finished = false;

changeButtons();

previousButton.addEventListener('click', previousQuestion);
nextButton.addEventListener('click', nextQuestion);

function initScoreList() {
    qsList.forEach(element => {
        scoreList.push(0);
    });
}

function nextQuestion() {
    scoreList[qsIndex] = slider.value;
    slider.value = 50;
    if (qsIndex + 1 < qsList.length) {
        qsIndex++;
        question.innerText = qsList[qsIndex];
    } else {
        console.log(getScore());
        console.log(getStatus());
        desappearQuestionsMenu();
    }
    changeButtons()
}

function previousQuestion() {
    if (qsIndex - 1 >= 0) {
        qsIndex--;
        question.innerText = qsList[qsIndex];
        slider.value = scoreList[qsIndex];
    }
    changeButtons()
}

function changeButtons() {
    let pg;
    nextButton.innerText == "Terminer" ? pg = 100 : pg = qsIndex * 100 / qsList.length
    progressBar.style.width = pg + "%";

    let opa;
    qsIndex == 0 ? opa = .5 : opa = 1;
    previousButton.style.opacity = opa;

    let text;
    qsIndex == qsList.length - 1 ? text = "Terminer" : text = "Suivante";
    nextButton.innerText = text;
}

function getScore() {
    let finalSore = 0;
    scoreList.forEach(score => {
        finalSore += parseInt(score);
    });
    return finalSore;
}

function getStatus() {
    let score = getScore()
    let numStatus = statusList.length;
    let maxScore = qsList.length * 100;
    let pointsPerStatus = maxScore / (numStatus - 1);

    statusIndex = Math.floor(score / pointsPerStatus);
    if (statusIndex < 0) {
        statusIndex = 0;
    } else if (statusIndex >= numStatus) {
        statusIndex = numStatus - 1;
    }

    return statusList[statusIndex];
}

function desappearQuestionsMenu() {
    questionsBloc.style.opacity = 0;
    //questionsBloc.style.filter = "brightness(0)";
    setTimeout(function () {
        questionsBloc.innerHTML = getResultCode();
        questionsBloc.style.opacity = 1;
        document.querySelector('main').style.height = "100%";
        shareButton = questionsBloc.querySelector('#share-button');
        shareButton.addEventListener('click', copyLink);
        //questionsBloc.style.filter = "brightness(1)";
    }, 1000);
}

function getResultCode() {
    let code = `
    <h2 id="status-label">${getStatus()}</h2>
    <h3 id="score-label">${getScore()}/${qsList.length * 100}</h3>
    <p id="description-label">${dcpList[statusIndex]}</p>
    <p id="quote-label">${citList[Math.floor(Math.random() * Math.floor(qsList.length))]}</p>
    
    <div id="results-buttons">
    <a href="/index.html"><i class="fa-solid fa-house"></i></a>
    <button class="classic-button" id="fiability-button">Doutes de fiabilité</button>
    <i id="share-button" class="fa-solid fa-share"></i>
    <div id="share-tooltip">Copié !</div>
    </div>
    `
    return code;
}

function copyLink() {
    navigator.clipboard.writeText("adresse").then(function () {
        const tooltip = document.getElementById("share-tooltip");
        tooltip.style.display = "block";
        tooltip.style.left = `${shareButton.offsetLeft - 5}px`;
        tooltip.style.top = `${shareButton.offsetTop - tooltip.offsetHeight}px`;
        setTimeout(() => {
            tooltip.style.display = "none";
        }, 1200);
    }, function (err) {
        console.error('Impossible de copier dans la presse-papier ', err);
    });
}