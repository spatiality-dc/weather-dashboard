//Local storage variables
var searchList = document.querySelector("#searchList");
var searchHistory = []; //empty array to store searches
const historyList = $("#historyList"); //<ul>  to store search history

// API key
const APIKey = "3a4631bba926601a48de1c001dc7ac75";

$("#searchTerm").on("keyup", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const searchTerm = e.currentTarget.value;
    updateForecast(searchTerm);
    window.localStorage.setItem("last-search", searchTerm);
  }
});

function updateForecast(location) {
  //Building the URL we need to query the database
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    location +
    "&appid=" +
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
      $(".wind").text("Wind Speed: " + response.wind.speed + " km/h");
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".search-btn").text(searchTerm);
      $(".search-btn").attr("Lon", response.coord.lon);
      $(".search-btn").attr("Lat", response.coord.lat);

      // Convert the temp to celsius
      var tempC = response.main.temp - 273.15;

      // add temp content to html
      $(".tempC").text("Temperature (C): " + tempC.toFixed(2));

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed + "km/h");
      console.log("Humidity: " + response.main.humidity + "%");
      console.log("Temperature (C): " + tempC);
      console.log("Lon: " + response.coord.lon);
      console.log("Lat: " + response.coord.lat);
    });

  //Five day forecast
  const forecastURL = "https://api.openweathermap.org/data/2.5/forecast";

  $.ajax({
    url: forecastURL, //API Call
    dataType: "json",
    type: "GET",
    data: {
      q: location,
      appid: APIKey,
      units: "metric",
      cnt: "5"
    },
    success: function(data) {
      console.log("Received data:", data);
      var weeklyForecast = "";
      weeklyForecast += "<h2>" + data.city.name + "</h2>"; // City
      $.each(data.list, function(index, val) {
        weeklyForecast += "<p>"; // Opening paragraph tag
        weeklyForecast += "<b>Day " + index + "</b>: "; // Day
        weeklyForecast += val.main.temp + "&degC"; // Temperature
        weeklyForecast += "<span> | " + val.weather[0].description + "</span>"; // Description
        weeklyForecast +=
          "<img src='https://openweathermap.org/img/w/" +
          val.weather[0].icon +
          ".png'>"; // Icon
        weeklyForecast += "</p>"; // Closing
      });
      $("#showWeatherForcast").html(weeklyForecast);
    }
  });

  renderButtons();
  // Function for displaying search history data
  function renderButtons() {
    // Deleting the buttons prior to adding new searches
    // (this is necessary otherwise you will have repeat buttons)
    $("#searchList").empty();

    // Then dynamically generating buttons in the array
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("search-btn");
    // Providing the initial button text
    a.text(searchTerm);
    // Adding the button to the searchList div
    $("#searchList").append(a);
  }
}

// UV Index API call
var lastSearchLat = a.attr("lat");
var lastSearchLon = a.attr("lon");

// function queryStringUV(lastSearchLat, lastSearchLon) {
function queryStringUV() {
  queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?";
  const APIKey = "3a4631bba926601a48de1c001dc7ac75";
  return (
    queryURLUV +
    "lat=" +
    lastSearchLat +
    "&lon=" +
    lastSearchLon +
    "&appid=" +
    APIKey
  );
}

function UVSearch(queryStringUV) {
  $.ajax({
    url: queryStringUV,
    method: "GET"
  }).then(function(response) {
    $(".uvIndex").html("<h1>" + response.value + " UV Index</h1>");
  });
}
