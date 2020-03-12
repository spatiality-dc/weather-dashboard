// API key
const APIKey = "3a4631bba926601a48de1c001dc7ac75";

$("#searchTerm").on("keyup", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const searchTerm = e.currentTarget.value;
    updateForecast(searchTerm);
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
