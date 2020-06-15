
var covidUpdates = document.getElementById("covid-updates");
var totalGlobalDeath = document.getElementById("total-global-death");
var totalGloballyConfirmed = document.getElementById("total-globally-confirmed")
var totalGloballyRecovered = document.getElementById("total-globally-recovered")
var lastUpdate =document.getElementById("last-update")
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
  var lastUpdateDate ="";

  // sorting based on Total confirmed cases
  var covidGlobalInfo = data.Countries;
  covidGlobalInfo.sort(function(obj1, obj2) {
    return obj2.TotalConfirmed - obj1.TotalConfirmed;
 });



 // for loop to get each country data
  for (i = 0; i < covidGlobalInfo.length; i++){
    covidInfo += "<p>" 
    +"<strong class="+"confermedCase"+">"+covidGlobalInfo[i].TotalConfirmed +"</strong>"+" <span></span> "
    +"<span class="+"confermedHead"+">"+ covidGlobalInfo[i].Country +"</span>"
    + "</p><hr>";
    if(covidGlobalInfo[i].Country.includes("India")){
      var a = covidGlobalInfo[i].valueOf();
      console.log(a)
    }
  }

// getting global data
  totalGConfirmed += "<p>"
  +"<span class="+"confermedHead"+"> Globally Total Confirmed </span><br>"
  +"<strong class="+"confermedCaseGlobally"+">"+ data.Global.TotalConfirmed +"</strong>"
  +"<br><hr><br><span class="+"confermedHead"+"> Globally New Confirmed </span><br>"
  +"<strong class="+"confermedCaseGlobally"+">"+ data.Global.NewConfirmed +"</strong>"+"<p>";

  totalGRecovered += "<p>"
  +"<span class="+"recoveredHead"+"> Globally Total Recovered </span><br>"
  + "<strong class="+"recoveredCase"+">"+ data.Global.TotalRecovered +"</strong>"
  +"<br><hr><br><span class="+"recoveredHead"+"> Globally New Recovered </span><br>"
  + "<strong class="+"recoveredCase"+">"+ data.Global.NewRecovered +"</strong>"+"<p>";

  totalGDeath += "<p>"
  +"<span class="+"deathHead"+">Total Global Total Death </span><br>"
  + "<strong class="+"confermedDeath"+">"+ data.Global.TotalDeaths+"</strong>"
  +"<br><hr><br><span class="+"deathHead"+"> Globally New Deaths </span><br>"
  + "<strong class="+"confermedDeath"+">"+data.Global.NewDeaths+"</strong>"+"</p>";

  lastUpdateDate += "<p class="+"lastUpdate"+">"
  +"Last Update: "
  +data.Date+"</p>";

  // adding to HTML page
  totalGloballyConfirmed.insertAdjacentHTML('beforeend',totalGConfirmed)
  totalGloballyRecovered.insertAdjacentHTML('beforeend',totalGRecovered)
  totalGlobalDeath.insertAdjacentHTML('beforeend',totalGDeath)
  covidUpdates.insertAdjacentHTML('beforeend',covidInfo)
  lastUpdate.insertAdjacentHTML('beforeend',lastUpdateDate)

}

// Send request
request.send();
