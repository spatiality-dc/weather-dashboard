// Create an empty javascript array
var recentSearches = [];

// API key
const APIKey = "3a4631bba926601a48de1c001dc7ac75";

//This function is called using the search buttons "onclick"
function searchFunction(data) {
  recentSearches.push($("#textboxSearch").val()); // This line puts the value from the text box in an array
  $("#textboxSearch").val(""); //  clear the text box after search
  $("#searchHistory").text(""); //clear the seach history window then repopulate with the new array

  // the function below loops through the array and adds each item in the array
  // to the span element within the Search history arear
  $.each(recentSearches, function(index, value) {
    $("#searchHistory").append(
      "<li class='historyItem'  onclick='addToTextBox(" +
        index +
        ")'>" +
        value +
        "</li>"
    );
    localStorage.setItem("last-search", value);
  });
}

function addToTextBox(id) {
  $("#textboxSearch").val(recentSearches[id]);
}

//clear search history option//
$("#clearButton").on("click", function() {
  localStorage.removeItem("searchHistory");
  location.reload();
});

function callAPI() {
  console.log("callAPI function runs");
  var location = localStorage.getItem("last-search");

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
      $(".search-btn").text(response.name);
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
      console.log(searchHistory);
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
}
