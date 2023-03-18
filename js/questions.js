const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

const question = document.querySelector('#questions-bloc .question');
const slider = document.querySelector('#questions-bloc .slider input');

const progressBar = document.querySelector('#content .progress-done');
const questionsBloc = document.getElementById('questions-bloc');
var shareButton;
const noobButton = document.getElementById('noob-button');

const qsList = ["Je m'immisce dans les échanges pour lesquels je n'ai point été convié",
    "Je m'exprime à propos de sujets qui peuvent être jugés insignifiants à l'oreille d'interlocuteurs qui n'y portent manifestement aucun intérêt",
    "Je fais étalage de mes qualités et me présente sous un jour avantageux dans mes échanges verbaux.",
    "Je me complais dans des descriptions circonvolues pour expliciter une notion fondamentalement élémentaire",
    "Je m'exprime avec une certaine suffisance et j'expose de manière récurrente ma connaissance sur divers sujets"
    , "Je suis réfractaire à toute observation ou critique"
    , "Je nourris constamment une vision négative des choses et mon attitude morose a une incidence sur l'humeur des personnes qui m'entourent"
    , "Je ris de façon isolée et indépendante"
    , "Je suis constamment enclin à dénigrer mes interlocuteurs"
    , "Je me surmets en voix sans justification apparente"
    , "Je lance des discussions futiles et sans réelle importance"
    , "Je m'efforce d'adopter une attitude excentrique en usant de grimaces incessantes"
    , "Je procrastine et sursois les obligations que j'ai pris envers autrui"
    , "Je ne tiens guère compte de la notion de ponctualité"
    , "Je m'exprime avec un cynisme constant et je porte continuellement une critique envers les instances d'autorité établies"
    , "Je manifeste de la duplicité et de la servilité envers certaines personnes dans l'objectif d'en tirer profit"
]

const qsListNoob = ["Je m'incruste dans les conversations dans lesquelles je ne suis pas invité",
    "Je parle de choses inintéressantes à des personnes qui manifestement n'en ont aucun intérêt",
    "Je me valorise et me mets en avant à tire-larigot dans mes conversations",
    "Je tourne autour du pot pour expliquer un truc méga simple",
    "Je parle avec un air condescendant et j'étale ma science en permanence"
    , "Je n'accepte pas les remarques"
    , "Je suis toujours pessimiste et propage ma mauvaise humeur aux autres"
    , "Je me tape des barres tout seul dans mon coin"
    , "Je rabaisse constamment les autres"
    , "Je me mets à parler fort sans aucune raison"
    , "J'entame des débats pour des pacotilles"
    , "J'essai de paraître le mec le plus chelou, notamment en faisant des grimaces h24"
    , "Je retarde et évite de faire les choses que j'ai promis de faire avec d'autres personnes"
    , "Je me pointe toujours en retard"
    , "Je n'arrête pas de me plaindre de tout"
    , "Je fais preuve de fourberie et fais le béni-oui-oui avec certaines personnes dans le but d'obtenir quelque chose"
]

const statusList = ["Normal", "Tendances PNJ", "PNJ modéré", "Vrai PNJ", "Giga PNJ"];
const dcpList = ["Rien à signaler, t'es un gars tout à fait normal. Tu croques la vie à pleine temps sans te cringer.",
    "T'as l'air plutôt normal. Tu peux t'égarer quelques fois, mais rien d'alarmant. Continue dans cette voie.",
    "Attention ! Tu commences à prendre des aises. Tu te moques en peu des conventions, sans pour autant être impudent. Il faut savoir trouver un juste milieu entre amusement et débilité.",
    "Là ça devient grave. Tu dois te préoccuper du regard des autres, et surtout les respecter. C'est bien de vivre sa best life, mais pas trop quand même. Il ne faudrait pas tomber dans la marginalité.",
    "C'est fichu, irrattrapable, c'est certain que t'es officiellement un PNJ. Tu cringe sûrement les autres sans t'en rendre compte. 2 solutions s'offrent à toi : continuer à vivre ta vie oklm ; ou céder aux exigences sociales. Fais ton choix !"]
const citList = ["« La société veut des citoyens, elle ne veut pas des hommes. » - Oscar Wilde",
    "«La normalité est une route pavée : on y marche aisément mais les fleurs n'y poussent pas. - Vincent Van Gogh»",
    "«La société veut des moutons, elle trouvera toujours un berger.» - Michel Audiard",
    "«Dans la vie, il n'y a qu'une chose qui soit vraiment importante : c'est de décider ce que l'on veut faire de sa vie.» - Winston Churchill",
    "«Les conventions sont des inventions humaines et rien ne nous oblige à les suivre aveuglément.» - Bertrand Russell",
    "«Dans toute société, il y a des normes qui façonnent les comportements, mais la créativité vient de ceux qui savent briser ces normes et faire les choses différemment.» - Quelqu'un"]
var statusIndex;
var qsIndex = 0; question.innerText = qsList[qsIndex];
var scoreList = []; initScoreList();
var finished = false;
var noobMode = false;
var elapsedTime = 0;

const timer = setInterval(function () {
    elapsedTime++;
}, 1000);

changeQuestion();
changeButtons();

previousButton.addEventListener('click', previousQuestion);
nextButton.addEventListener('click', nextQuestion);

function initScoreList() {
    qsList.forEach(element => {
        scoreList.push(0);
    });
}

function nextQuestion() {
    if (finished) return

    scoreList[qsIndex] = slider.value;
    slider.value = 50;
    if (qsIndex + 1 < qsList.length) {
        qsIndex++;
        changeQuestion();
    } else {
        desappearQuestionsMenu();

    }
    changeButtons()
}

function previousQuestion() {
    if (finished) return

    if (qsIndex - 1 >= 0) {
        qsIndex--;
        changeQuestion();
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
    finished = true;
    questionsBloc.style.opacity = 0;
    //questionsBloc.style.filter = "brightness(0)";
    setTimeout(function () {
        questionsBloc.innerHTML = getResultCode();
        spawSeveralConfettis();
        questionsBloc.style.opacity = 1;
        document.querySelector('main').style.height = "100%";
        shareButton = questionsBloc.querySelector('#share-button');
        shareButton.addEventListener('click', copyLink);
        //questionsBloc.style.filter = "brightness(1)";
    }, 1000);
}

function getResultCode() {
    getStatus();
    let desc;
    elapsedTime < qsList.length ? desc = "T'aurais pas juste cliqué n'importe où par hasard ?" : desc = dcpList[statusIndex];
    let code = `
    <h2 id="status-label">${getStatus()}</h2>
    <h3 id="score-label">${getScore()}/${qsList.length * 100}</h3>
    <p id="description-label">${desc}</p>
    <p id="quote-label">${citList[Math.floor(Math.random() * Math.floor(citList.length))]}</p>
    
    <div id="results-buttons">
    <a href="../index.html"><i class="fa-solid fa-house"></i></a>
    <a href="informations.html"><button class="classic-button" id="fiability-button">Doutes de fiabilité</button></a>
    <i id="share-button" class="fa-solid fa-share"></i>
    <div id="share-tooltip">Copié !</div>
    </div>
    `
    return code;
}

function copyLink() {
    navigator.clipboard.writeText("https://hellolife2750.github.io/pnj-o-meter/").then(function () {
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

noobButton.addEventListener('click', switchNoobMode);

function switchNoobMode() {
    noobMode = !noobMode;
    let text = "Noob Mode "
    noobMode ? text += "ON" : text += "OFF";
    noobButton.innerText = text;
    changeQuestion();
}

function changeQuestion() {
    let qs = "Q" + (qsIndex + 1) + ") ";
    noobMode ? qs += qsListNoob[qsIndex] : qs += qsList[qsIndex];
    question.innerText = qs;

}

/*confettis*/
import { confetti } from "https://cdn.jsdelivr.net/npm/tsparticles-confetti/+esm";

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

const spawnConfettis = () => {
    if (finished) {
        confetti({
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(50, 100),
            origin: { y: 0.6 }
        });
    }
};

function spawSeveralConfettis() {
    let count = 0;
    let timeMin = 1;
    let timeMax = 3;
    spawnConfettis();
    const interval = setInterval(() => {
        spawnConfettis();
        count++;
        if (count >= 5) {
            clearInterval(interval);
        }
    }, Math.floor(Math.random() * (timeMax * 1000 - timeMin * 1000 + 1)) + timeMin * 1000);
}

document.addEventListener('keypress', function (event) {
    event.code === 'Space' ? spawnConfettis() : 0;
});


