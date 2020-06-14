
var covidUpdates = document.getElementById("covid-updates");
var totalGlobalDeath = document.getElementById("total-global-death");
var totalGloballyConfirmed = document.getElementById("total-globally-confirmed")
var totalGloballyRecovered = document.getElementById("total-globally-recovered")
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

  // creating variables
  var covidInfo ="";
  var totalGDeath = "";
  var totalGConfirmed = "";
  var totalGRecovered = "";

  // sorting based on Total confirmed cases
  var covidGlobalInfo = data.Countries;
  covidGlobalInfo.sort(function(obj1, obj2) {
    return obj2.TotalConfirmed - obj1.TotalConfirmed;
 });

 // for loop to get each country data
  for (i = 0; i < covidGlobalInfo.length; i++){
    covidInfo += "<p>" 
    +covidGlobalInfo[i].TotalConfirmed +"  "
    + covidGlobalInfo[i].Country
    
    + "</p><hr>";
  }

// getting global data
  totalGConfirmed += "<p>"
  +"<strong> Globally Total Confirmed </strong><br>"
  +data.Global.TotalConfirmed
  +"<br><hr><br><strong> Globally New Confirmed </strong><br>"
  +data.Global.NewConfirmed+"<p>";

  totalGRecovered += "<p>"
  +"<strong> Globally Recovered </strong><br>"
  +data.Global.TotalRecovered
  +"<br><hr><br><strong> Globally New Recovered </strong><br>"
  +data.Global.NewRecovered+"<p>";

  totalGDeath += "<p>"
  +"<strong>Total Global Death </strong><br>"
  + data.Global.TotalDeaths
  +"<br><hr><br><strong> Globally New Deaths </strong><br>"
  +data.Global.NewDeaths+"</p>";

  // adding to HTML page
  totalGloballyConfirmed.insertAdjacentHTML('beforeend',totalGConfirmed)
  totalGloballyRecovered.insertAdjacentHTML('beforeend',totalGRecovered)
  totalGlobalDeath.insertAdjacentHTML('beforeend',totalGDeath)
  covidUpdates.insertAdjacentHTML('beforeend',covidInfo)

}

// Send request
request.send();
