// Fonction pour récupérer l'adresse IP du visiteur
function getIpAddress() {
    return fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => data.ip);
}

// Fonction pour créer un cookie avec l'adresse IP et d'autres informations
function setVisitorInfoCookie(ipAddress, browserName, browserVersion, osName) {
    document.cookie = `ipAddress=${ipAddress}; max-age=86400; path=/`;
    document.cookie = `browserName=${browserName}; max-age=86400; path=/`;
    document.cookie = `browserVersion=${browserVersion}; max-age=86400; path=/`;
    document.cookie = `osName=${osName}; max-age=86400; path=/`;
}

// Fonction pour récupérer la valeur d'un cookie
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Appel de la fonction pour récupérer l'adresse IP et d'autres informations et les stocker dans un cookie
getIpAddress().then(ipAddress => {
    const browserName = window.navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)[1];
    const osName = window.navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows|Linux)/);
    
    setVisitorInfoCookie(ipAddress, browserName, osName);
});

function getOsName() {
    const platform = navigator.platform;
    const userAgent = navigator.userAgent;
    let osName = "Unknown";

    if (platform.indexOf("Win") !== -1) {
        if (userAgent.indexOf("Windows NT 10.0") !== -1) {
            osName = "Windows 10";
        } else if (userAgent.indexOf("Windows NT 6.3") !== -1) {
            osName = "Windows 8.1";
        } else if (userAgent.indexOf("Windows NT 6.2") !== -1) {
            osName = "Windows 8";
        } else if (userAgent.indexOf("Windows NT 6.1") !== -1) {
            osName = "Windows 7";
        } else if (userAgent.indexOf("Windows NT 6.0") !== -1) {
            osName = "Windows Vista";
        } else if (userAgent.indexOf("Windows NT 5.1") !== -1) {
            osName = "Windows XP";
        } else if (userAgent.indexOf("Windows NT 5.0") !== -1) {
            osName = "Windows 2000";
        } else {
            osName = "Windows";
        }
    } else if (platform.indexOf("Mac") !== -1) {
        osName = "Mac OS X";
    } else if (platform.indexOf("Linux") !== -1) {
        osName = "Linux";
    } else if (platform.indexOf("iPhone") !== -1) {
        osName = "iOS";
    } else if (platform.indexOf("iPad") !== -1) {
        osName = "iOS";
    } else if (platform.indexOf("Android") !== -1) {
        osName = "Android";
    } else if (platform.indexOf("BlackBerry") !== -1) {
        osName = "BlackBerry";
    } else if (platform.indexOf("Windows Phone") !== -1) {
        osName = "Windows Phone";
    }

    return osName;
}

function isPrivateMode() {
    return new Promise((resolve) => {
      const on = () => resolve(true); // Le mode privé est activé
      const off = () => resolve(false); // Le mode privé n'est pas activé
  
      // Vérifie si le mode privé est activé en essayant d'utiliser un objet de stockage privé
      try {
        const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
        if (!fs) {
          // Le navigateur ne supporte pas l'API FileSystem
          return resolve(false);
        }
  
        fs(
          window.TEMPORARY,
          100,
          () => off(),
          () => on(),
        );
      } catch (e) {
        // Le mode privé est activé
        on();
      }
    });
  }
  
  
  

// Exemple d'utilisation : affichage des informations du visiteur
const ipInfo = document.getElementById('ipInfo');
const nav = document.getElementById('navigateur');
const systeme = document.getElementById('systeme');
const language = window.navigator.language;
const largeurEcran = window.screen.width;
const hauteurEcran = window.screen.height;
const localisation = document.getElementById('localisation');
const taille = document.getElementById('taille');
const langue = document.getElementById('lang');
const ipAddress = getCookie('ipAddress');
const browserName = getCookie('browserName');
const osName = getOsName();

ipInfo.innerHTML = `
    <p>Adresse IP : ${ipAddress}</p>
  `;
nav.innerHTML = `
  <p>Navigateur : ${browserName}</p>
`;
systeme.innerHTML = `
<p>Système d'exploitation : ${osName}</p>
`;
langue.innerHTML = `
<p>Langue : ${language}</p>
`;
taille.innerHTML = `
<p>Taille de l'écran : ${largeurEcran} x ${hauteurEcran}</p>
`;
// localisation.innerHTML = `
// <p>géolocalisation : ${local}</p>
// `;
