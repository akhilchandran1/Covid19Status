
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
    +"</p>"
    +"<p  class="+"countryDeathAndRecovered"+">"
    +"<span class="+"NewConfirmed"+">New Confirmed: </span><span class="+"NewConfirmedNumber"+">"+covidGlobalInfo[i].NewConfirmed+"</span> | "
    +"</p>"
    +"<p class="+"countryDeathAndRecovered"+">"
    +"<span class="+"totalDeath"+">Total Death: </span><span class="+"totalandNewDeath"+">"+covidGlobalInfo[i].TotalDeaths+"</span> | "
    +"<span class="+"totalRecovered"+">Total Recovered: </span><span class="+"totalandNewRecovered"+">"+covidGlobalInfo[i].TotalRecovered+"</span> "
    +"</p>"
    +"<p class="+"countryDeathAndRecovered"+">"
    +"<span class="+"NewDeath"+">New Death: </span><span class="+"totalandNewDeath"+">"+covidGlobalInfo[i].NewDeaths+"</span> | "
    +"<span class="+"NewRecovered"+">New Recovered: </span><span class="+"totalandNewRecovered"+">"+covidGlobalInfo[i].NewRecovered+"</span>"
    +"</p>"
    +"<hr>";
    /*
    if(covidGlobalInfo[i].Country.includes("India")){
      var a = covidGlobalInfo[i].valueOf();
      console.log(a)
    }
    */
  }

// getting global data
  totalGConfirmed += "<p>"
  +"<span class="+"confermedHead"+"> Globally Total Confirmed </span><br>"
  +"<strong class="+"confermedCaseGlobally"+">"+ data.Global.TotalConfirmed +"</strong>"
  +"<br><hr><br><span class="+"confermedHead"+"> Globally New Confirmed </span><br>"
  +"<strong class="+"confermedCaseGlobally"+">"+ data.Global.NewConfirmed +"</strong>"+"<p><hr>";

  totalGRecovered += "<p>"
  +"<span class="+"recoveredHead"+"> Globally Total Recovered </span><br>"
  + "<strong class="+"recoveredCase"+">"+ data.Global.TotalRecovered +"</strong>"
  +"<br><hr><br><span class="+"recoveredHead"+"> Globally New Recovered </span><br>"
  + "<strong class="+"recoveredCase"+">"+ data.Global.NewRecovered +"</strong>"+"<p><hr>";

  totalGDeath += "<p>"
  +"<span class="+"deathHead"+">Total Global Death </span><br>"
  + "<strong class="+"confermedDeath"+">"+ data.Global.TotalDeaths+"</strong>"
  +"<br><hr><br><span class="+"deathHead"+"> Globally New Deaths </span><br>"
  + "<strong class="+"confermedDeath"+">"+data.Global.NewDeaths+"</strong>"+"</p>";

  lastUpdateDate += "<p class="+"lastUpdate"+">"
  +"Last Update: "
  +data.Date+"</p>";
// __________________________________________________________________________________

createGlobalLineChart();
createGlobalPieChart();
createGlobalbarChart();
// Line Chart
function createGlobalLineChart(){
const ctx = document.getElementById('lineChart').getContext('2d');
const xlabels = ['Total Confirmed','New Confirmed','Total Recovered','New Recovered','Total Death','New Deaths'];
const yCases = [data.Global.TotalConfirmed, data.Global.NewConfirmed, data.Global.TotalRecovered, data.Global.NewRecovered, data.Global.TotalDeaths, data.Global.NewDeaths];
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xlabels,
        datasets: [{
            label: '# covid 19 chart',
           // fill: false,
            data: yCases,
            backgroundColor: [
                'rgba(252, 73, 3)',
                'rgba(252, 73, 3)',
                'rgba(28, 252, 3)',
                'rgba(28, 252, 3)',
                'rgba(252, 3, 3)',
                'rgba(252, 3, 3)'
              ],
            borderColor: [
                'rgba(252, 3, 3)',
                'rgba(252, 3, 3)',
                'rgba(11, 112, 0)',
                'rgba(11, 112, 0)',
                'rgba(135, 3, 3)',
                'rgba(135, 3, 3)'
              ],
            borderWidth: 1
        }]
    }
});
}

// Pie Chart
function createGlobalPieChart(){
  const ctx = document.getElementById('pieChart').getContext('2d');
  const xlabels = ['Total Confirmed','New Confirmed','Total Recovered','New Recovered','Total Death','New Deaths'];
  const yCases = [data.Global.TotalConfirmed, data.Global.NewConfirmed, data.Global.TotalRecovered, data.Global.NewRecovered, data.Global.TotalDeaths, data.Global.NewDeaths];
  const chart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: xlabels,
          datasets: [{
              label: '# covid 19 chart',
             // fill: false,
              data: yCases,
              backgroundColor: [
                  'rgba(252, 73, 3)',
                  'rgba(204, 79, 2)',
                  'rgba(28, 252, 3)',
                  'rgba(3, 145, 5)',
                  'rgba(252, 3, 3)',
                  'rgba(145, 3, 24)'
                ],
              borderColor: 'rgba(255, 255, 255)',
              borderWidth: 1
          }]
      }
  });
  }

// Bar Chart
function createGlobalbarChart(){
  const ctx = document.getElementById('barChart').getContext('2d');
  const xlabels = ['Total Confirmed','New Confirmed','Total Recovered','New Recovered','Total Death','New Deaths'];
  const yCases = [data.Global.TotalConfirmed, data.Global.NewConfirmed, data.Global.TotalRecovered, data.Global.NewRecovered, data.Global.TotalDeaths, data.Global.NewDeaths];
  const chart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: xlabels,
          datasets: [{
              label: '# covid 19 chart',
             // fill: false,
              data: yCases,
              backgroundColor: [
                  'rgba(252, 73, 3)',
                  'rgba(204, 79, 2)',
                  'rgba(28, 252, 3)',
                  'rgba(3, 145, 5)',
                  'rgba(252, 3, 3)',
                  'rgba(145, 3, 24)'
                ],
              borderColor: 'rgba(255, 255, 255)',
              borderWidth: 1
          }]
      }
  });
  }
// __________________________________________________________________________________

if(navigator.onLine){
  // adding to HTML page
  totalGloballyConfirmed.insertAdjacentHTML('beforeend',totalGConfirmed)
  totalGloballyRecovered.insertAdjacentHTML('beforeend',totalGRecovered)
  totalGlobalDeath.insertAdjacentHTML('beforeend',totalGDeath)
  covidUpdates.insertAdjacentHTML('beforeend',covidInfo)
  lastUpdate.insertAdjacentHTML('beforeend',lastUpdateDate)
} else { // this alert will show up if the user is offline 
  alert('You are offline !!. Internet Connection is required to continue.');
}

}

// Send request
request.send();
