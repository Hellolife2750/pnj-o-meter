
//popup coockies
const coockiesPopup = document.getElementById("coockies-popup");
const coockiesOverlay = document.getElementById('coockies-overlay');
const acpCoockiesBtn = document.querySelector('.hungry');
const rfsCoockiesBtn = document.querySelector('.angry');
const loadingScreen = document.querySelector('.loading');

/*document.body.style.overflow = "hidden";*/

setTimeout(function () {
    /*coockiesPopup.style.display = "flex";
    coockiesOverlay.style.display = "block";*/
}, 2000);

acpCoockiesBtn.addEventListener('click', showPage);
rfsCoockiesBtn.addEventListener('click', () => { location.reload() });

function showPage() {
    coockiesPopup.remove();
    coockiesOverlay.remove();
    loadingScreen.remove();
    document.body.style.overflow = "visible";
}

//adapter la marge au header
applyHeaderMargin();
window.addEventListener("resize", applyHeaderMargin);

function applyHeaderMargin() {
    var headerHeight = document.querySelector('header').offsetHeight;
    document.querySelector('main').style.marginTop = headerHeight + 'px';
}

//menu header responsive
const openMenuBtn = document.getElementById('open-menu-btn');
let body = document.querySelector('body');

openMenuBtn.addEventListener("click", () => {
    body.classList.toggle("opened")
});

/*cartes candidats*/

var candidats;
var cdtIndex = 0;

/*récupère le informations sur les candidats contenus dans le fichier json*/
fetch('../res/dat/candidats.json')
    .then(response => response.json())
    .then(data => {
        candidats = data.candidats;
        updateCard();
    })
    .catch(error => console.error("Unable to load candidats' card content :", error));

//mettre à jour la carte
const theCard = document.querySelector("#contact .dev-card");
const nextCdtBtn = document.getElementById('next-cdt-btn');

const cdtPhoto = document.getElementById('candidat-photo');
const cdtOverview = document.getElementById('quick-candidat-overfiew');
const cdtName = document.getElementById('cdt-name');
const cdtDescription = document.getElementById('candidat-description');

function updateCard() {
    cdtPhoto.src = candidats[cdtIndex]["profilePic"];
    cdtName.innerText = candidats[cdtIndex]["name"];
    cdtDescription.innerText = candidats[cdtIndex]["description"];

    cdtOverview.children[0].innerText = candidats[cdtIndex]["persoInfos"]["birth"];
    cdtOverview.children[1].innerText = candidats[cdtIndex]["persoInfos"]["profession"];
    cdtOverview.children[2].innerText = candidats[cdtIndex]["persoInfos"]["size"];
}

//passer à la carte suivante
nextCdtBtn.addEventListener('click', nextCard);
function nextCard() {
    if (candidats.length == 0) return;
    if (cdtIndex < candidats.length - 1) {
        cdtIndex++;
    } else {
        cdtIndex = 0;
    }
    updateCard()
}

//envoyer le message
const sendApplicationBtn = document.getElementById('send-application');
const messageInput = document.getElementById('message-input');

sendApplicationBtn.addEventListener("click", () => {
    let mess = messageInput.value;
    if (mess == "") return;
    sendMessage(mess);
    messageInput.value = "Merciiiiii !";
})

//envoie un message sur un serv discord
function sendMessage(message) {
    try {
        var request = new XMLHttpRequest();
        request.open("POST", "https://discord.com/api/webhooks/" + candidats[cdtIndex]["messageToken"], true);
        request.setRequestHeader('Content-type', 'application/json');

        var params = {
            username: "MeeticMatch",
            content: "" + message
        };

        request.send(JSON.stringify(params));
    } catch (e) {
        console.log("Impossible d'envoyer un message au serveur discord. Token invalide ??")
    }

}

//faux liens média
const fakeLinks = document.querySelectorAll('#social-medias > i');
const fakeLinksPopup = document.getElementById('fake-links-popup');

fakeLinks.forEach(function (link) {
    link.addEventListener("click", fakeLinkClicked)
});

async function fakeLinkClicked() {
    if (fakeLinksPopup.style.display == "block") return;
    fakeLinksPopup.style.display = "block";
    await sleep(4000);
    fakeLinksPopup.style.display = "none";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}