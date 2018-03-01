var tickRate = 60000 // On vérifiera l'api toutes les minutes
var client_id = '0wsim2an9x8uddmejdpt5uck4u6su8'
var channel = 'Buchx'
chrome.browserAction.setIcon({path:"img/offline.png"})

function checkStream() {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "https://api.twitch.tv/kraken/streams/"+channel+"?client_id="+client_id, true)
  xhr.onreadystatechange = function () {
    if(xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText)
      var elm  = document.getElementById("info")
      if(data["stream"] === null){
        chrome.browserAction.setIcon({path:"img/offline.png"})
        chrome.browserAction.setTitle({title: ''})
        chrome.browserAction.setBadgeText({text: ''})
        elm.innerHTML = channel+" n'est pas en live actuellement !<br>Nein nein nein :("
      }else{
        chrome.browserAction.setIcon({path:"img/buchx.png"})
        chrome.browserAction.setTitle({title: data["stream"]["channel"]["status"].toString()})
        chrome.browserAction.setBadgeText({text: data["stream"]["viewers"].toString()})
        chrome.browserAction.setBadgeBackgroundColor({color: '#51AC45'})
        elm.innerHTML = channel+" est en live !<br>("+data["stream"]["channel"]["game"].toString()+")"
      }
      // On relance la fonction après X secondes
      setTimeout(checkStream, tickRate)
    }
  }
  xhr.send()
}

// On lance la fonction dès le démarrage
checkStream()