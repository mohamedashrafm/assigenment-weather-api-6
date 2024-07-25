var today = document.getElementById("today");
var todayData = document.getElementById("today-date");
var cityLocation = document.getElementById("location");
var todayDegree = document.getElementById("today-degree");
var todayIcon = document.getElementById("today-icon");
var description = document.getElementById("today-description");
var humidty = document.getElementById("humidty");
var wind = document.getElementById("wind");
var compass = document.getElementById("compass");
var findCity = document.getElementById("find");

var nextDay = document.getElementsByClassName("nextDay"),
  nextDayIcon = document.getElementsByClassName("nextDay-icon"),
  maxDegree = document.getElementsByClassName("max-degree"),
  minDegree = document.getElementsByClassName("min-degree"),
  nextDayDescription = document.getElementsByClassName("nextDay-description"),

  searchedCity = "cairo",
  apiResponse,
  responseData,
  monthName = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Spet",
    "Oct",
    "Nov",
    "Dec",
  ],
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

async function getWeatherData(currentCity = "cairo") {
  apiResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=8dbc624780734895993162306232602&q=${searchedCity}&days=3`
  );
  responseData = await apiResponse.json();
  console.log(responseData);
  displayTodayWeather();
  displayNextDayWeather();
}
getWeatherData();

function displayTodayWeather() {
  var date = new Date();
  console.log(date);
  today.innerHTML = days[date.getDay()];
  todayData.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
  cityLocation.innerHTML = responseData.location.name;
  todayDegree.innerHTML = responseData.current.temp_c;
  todayIcon.setAttribute("src", `https:${responseData.current.condition.icon}`);
  description.innerHTML = responseData.current.condition.text;
  humidty.innerHTML = responseData.current.humidity;
  wind.innerHTML = responseData.current.wind_kph;
  compass.innerHTML = responseData.current.wind_dir;
}

function displayNextDayWeather() {
  for (var i = 0; i < nextDay.length; i++) {
    nextDay[i].innerHTML =
      days[new Date(responseData.forecast.forecastday[i + 1].date).getDay()];
    nextDayIcon[i].setAttribute(
      "src",
      `https:${responseData.forecast.forecastday[i + 1].day.condition.icon}`
    );
    maxDegree[i].innerHTML =
      responseData.forecast.forecastday[i + 1].day.maxtemp_c;
    minDegree[i].innerHTML =
      responseData.forecast.forecastday[i + 1].day.mintemp_c;
    nextDayDescription[i].innerHTML =
      responseData.forecast.forecastday[i + 1].day.condition.text;
  }
}
findCity.addEventListener("keyup", function () {
  searchedCity = findCity.value;
  console.log(searchedCity);
  getWeatherData();
});
