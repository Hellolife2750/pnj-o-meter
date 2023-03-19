
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