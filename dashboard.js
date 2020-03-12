// API key
const APIKey = "3a4631bba926601a48de1c001dc7ac75";

//Building the URL we need to query the database
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?" +
  "q=Bujumbura,Burundi&appid=" +
  APIKey;

//AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);

    // Convert the temp to celsius
    var tempC = response.main.temp - 273.15;

    // add temp content to html
    $(".tempC").text("Temperature (C): " + tempC.toFixed(2));

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (C): " + tempC);
  });

debugger;

//   function queryString() {
//     var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
//     var queryParameters = { "appid=": "3a4631bba926601a48de1c001dc7ac75" };

//     queryParameters.q = $("#searchTerm")
//       .val()
//       .trim();

//     return queryURL + $.param(queryParameters);
//   }

//   $.ajax({
//     url: queryString,
//     method: "GET"
//   }).then(function(response) {
//     console.log(queryString);
//     console.log(response);
//     var tempCelsius = response.main.temp - 273.15;

//     // Create CODE HERE to transfer content to HTML
//     $(".city").html("<h3>" + response.name + " Weather Details</h1>");
//     $(".wind").html("<p>" + response.wind.speed + " wind speed</p>");
//     $(".temp").html(
//       "<p>" + tempCelsius.toFixed(2) + " degress Celsius</p>"
//     );
//   });

//Five day forecast

var citySearch = "Bujumbura"; // Test case
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast";

$.ajax({
  url: forecastURL, //API Call
  dataType: "json",
  type: "GET",
  data: {
    q: citySearch,
    appid: APIKey,
    units: "metric",
    cnt: "5"
  },
  success: function(data) {
    console.log("Received data:", data); // For testing
    var weeklyForecast = "";
    weeklyForecast += "<h2>" + data.city.name + "</h2>"; // City (displays once)
    $.each(data.list, function(index, val) {
      weeklyForecast += "<p>"; // Opening paragraph tag
      weeklyForecast += "<b>Day " + index + "</b>: "; // Day
      weeklyForecast += val.main.temp + "&degC"; // Temperature
      weeklyForecast += "<span> | " + val.weather[0].description + "</span>"; // Description
      weeklyForecast +=
        "<img src='https://openweathermap.org/img/w/" +
        val.weather[0].icon +
        ".png'>"; // Icon
      weeklyForecast += "</p>"; // Closing paragraph tag
    });
    $("#showWeatherForcast").html(weeklyForecast);
  }
});
