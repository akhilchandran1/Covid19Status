
var covidUpdates = document.getElementById("covid-updates");
var totalGlobalDeath = document.getElementById("total-global-death");
var totalGlobaleyConfermed = document.getElementById("total-globaley-confermed")
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.covid19api.com/summary', true);

request.onload = function () {

 //console.log(request.responseText)

 var covidData = JSON.parse(request.responseText);
 //console.log(covidData.Global)
 //console.log(covidData.Countries)
 renderHTML(covidData)

 };

 function renderHTML(data){

  var covidInfo ="";
  var totalGDeath = "";
  var totalGConfermed = "";

  for (i = 0; i < data.Countries.length; i++){
    covidInfo += "<p>" 
    +data.Countries[i].TotalConfirmed +"  "
    + data.Countries[i].Country
    
    + "</p><hr>";
    console.log(data.Countries[i].Country);
   
  }
  totalGConfermed += "<p>"+"<strong> Globaley Confermed </strong><br>"+data.Global.TotalConfirmed+"<p>";
  totalGDeath += "<p>"+"<strong>Total Global Death </strong><br>"+ data.Global.TotalDeaths+"</p>";

  totalGlobaleyConfermed.insertAdjacentHTML('beforeend',totalGConfermed)
  totalGlobalDeath.insertAdjacentHTML('beforeend',totalGDeath)
  covidUpdates.insertAdjacentHTML('beforeend',covidInfo)

}

// Send request
request.send();
