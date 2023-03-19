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
    const browserVersion = window.navigator.userAgent.match(/version\/(\d+)/i);
    const osName = window.navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);
    setVisitorInfoCookie(ipAddress, browserName, browserVersion, osName);
  });
  
  // Exemple d'utilisation : affichage des informations du visiteur
  const infoContainer = document.getElementById('info-container');
  const ipAddress = getCookie('ipAddress');
  const browserName = getCookie('browserName');
  const browserVersion = getCookie('browserVersion');
  const osName = getCookie('osName');
  
  infoContainer.innerHTML = `
    <p>Adresse IP : ${ipAddress}</p>
    <p>Navigateur : ${browserName} ${browserVersion ? browserVersion[1] : ''}</p>
    <p>Système d'exploitation : ${osName ? osName[1] : ''}</p>
  `;