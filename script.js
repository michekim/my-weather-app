// Formatting the current date
function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentDate.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let date = currentDate.getDate();
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = currentDate.getFullYear();

  return `Today: ${day} ${month} ${date}, ${year} <br/> Last updated: ${hours}:${minutes}`;
}

// Convert Degree Scales to Fahrenheit
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#number-temperature");
  let maxTemperatureElement = document.querySelector("#max");
  let minTemperatureElement = document.querySelector("#min");
  let feelsLikeTemperatureElement = document.querySelector("#feels-like");

  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let maxTemperatureFahrenheit = (maxTemperature * 9) / 5 + 32;
  let minTemperatureFahrenheit = (minTemperature * 9) / 5 + 32;
  let feelsLikeFahrenheit = (feelsLike * 9) / 5 + 32;

  let maxTemperatureValue = Math.round(maxTemperatureFahrenheit);
  maxTemperatureElement.innerHTML = `Max: ${maxTemperatureValue}°`;

  let minTemperatureValue = Math.round(minTemperatureFahrenheit);
  minTemperatureElement.innerHTML = `Min: ${minTemperatureValue}°`;

  let feelsLikeValue = Math.round(feelsLikeFahrenheit);
  feelsLikeTemperatureElement.innerHTML = `Feels like: ${feelsLikeValue}°`;
}

//  let maxTemperatureValue = Math.round(response.data.main.temp_max);
//  let temperatureMaxDisplay = document.querySelector("#max");
//  temperatureMaxDisplay.innerHTML = `Max: ${maxTemperatureValue}°`;

// Convert Degree Scales to Celcius
let celciusTemperature = null;

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", convertToCelcius);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#number-temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

// Weather Search Bar
function searchCity(city) {
  let apiKey = "cc3020a8130c9ab7aef52513c57eeb32";
  // let apiEndpoint = "https://api.openweathermap.org/data/2.5/forecast/daily";
  // let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric&cnt=7`;

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function showWeatherConditions(response) {
  document.querySelector("#number-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".city-name").innerHTML = response.data.name;
  document.querySelector(".country-name").innerHTML = response.data.sys.country;
  document.querySelector(".weather-description").innerHTML =
    response.data.weather[0].description;

  let maxTemperatureValue = Math.round(response.data.main.temp_max);
  let temperatureMaxDisplay = document.querySelector("#max");
  temperatureMaxDisplay.innerHTML = `Max: ${maxTemperatureValue}°`;

  let minTemperatureValue = Math.round(response.data.main.temp_min);
  let temperatureMinDisplay = document.querySelector("#min");
  temperatureMinDisplay.innerHTML = `Min: ${minTemperatureValue}°`;

  let feelsLikeTemperature = Math.round(response.data.main.feels_like);
  let feelsLikeDisplay = document.querySelector(".feels-like");
  feelsLikeDisplay.innerHTML = `Feels like: ${feelsLikeTemperature}°`;

  let windDescription = Math.round(response.data.wind.speed);
  let windDisplay = document.querySelector(".wind");
  windDisplay.innerHTML = `Wind speed: ${windDescription} m/s`;

  let dateElement = document.querySelector("#todays-date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  celciusTemperature = response.data.main.temp;

  maxTemperature = response.data.main.temp_max;
  minTemperature = response.data.main.temp_min;
  feelsLike = response.data.main.feels_like;

  // let temperature = Math.round(response.data.main.temp);
  // let numeral = document.querySelector("#number-temperature");
  // numeral.innerHTML = `${temperature}`;

  // let currentCity = response.data.name;
  // let cityDisplay = document.querySelector(".city-name");
  // cityDisplay.innerHTML = `${currentCity}`;

  // let currentCountry = response.data.sys.country;
  // let countryDisplay = document.querySelector(".country-name");
  // countryDisplay.innerHTML = `,${currentCountry}`;
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

searchCity("Seattle");

// // Show Weather for Searched City
// funciton.searchWeatherForCity(reponse) {
//   let inputValue = document.querySelector("#search-input");
//   let searchedCity = inputValue.value;
//   let cityName = response.data.name;
//   let cityTemperature = Math.round(response.data.main.temp);
//   let units = "metric";
//   let apiKey = "cc3020a8130c9ab7aef52513c57eeb32";
//   let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
//   let apiUrl = `${apiEndpoint}?q=${searchedCity}&appid=${apiKey}&units=${units}`;

//   axios.get(apiUrl).then(searchWeatherForCity);
// }
// let searchButton = document.querySelector("#search-button");
// searchButton.addEventListener("click", searchWeatherForCity);

// function showTemperature(response) {
//   let cityTemperature = Math.round(response.data.main.temp);

// }

// Geolocation + Show Temperature

function showPosition(position) {
  // let latitude = position.coords.latitude;
  // let longitude = position.coords.longitude;
  // let units = "metric";
  let apiKey = "cc3020a8130c9ab7aef52513c57eeb32";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let myLocationButton = document.querySelector("#geolocation-button");
myLocationButton.addEventListener("click", getCurrentLocation);
