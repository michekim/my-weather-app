// Formatting the current date
let currentDate = new Date();
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

let today = `<font size="-1">Today: ${hours}:${minutes} | ${day} ${month} ${date}, ${year}</font>`;
document.getElementById("todays-date").innerHTML = today;

// --------------------------------------------------------------------

// Convert Degree Scales to Fahrenheit
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToFahrenheit(event) {
  event.preventDefault();
  let displayedTemperature = document.querySelector(".number-temperature");
  let temperature = displayedTemperature.innerHTML;
  temperature = Number(temperature);
  displayedTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);

  // let displayedFeelsLikeTemperature = document.querySelector(".feels-like");
  // feelsLikeTemperature = displayedFeelsLikeTemperature.innerHTML;
  // feelsLikeTemperature = Number(feelsLikeTemperature);
  // displayedFeelsLikeTemperature.innerHTML = Math.round((feelsLikeTemperature * 9) / 5 + 32);
}

// Convert Degree Scales to Celcius
let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", convertToCelcius);

function convertToCelcius(event) {
  event.preventDefault();
  let displayedTemperature = document.querySelector(".number-temperature");
  let temperature = displayedTemperature.innerHTML;
  temperature = Number(temperature);
  displayedTemperature.innerHTML = Math.round(((temperature - 32) * 5) / 9);

  let displayedFeelsLikeTemperature = document.querySelector(".feels-like");
  feelsLikeTemperature = displayedFeelsLikeTemperature.innerHTML;
  feelsLikeTemperature = Number(feelsLikeTemperature);
  displayedFeelsLikeTemperature.innerHTML = Math.round(
    ((feelsLikeTemperature - 32) * 5) / 9
  );
}
// -----------------------------------------------------------------

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
  console.log(response.data.main.temp);
  document.querySelector("#number-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".city-name").innerHTML = response.data.name;
  document.querySelector(".country-name").innerHTML = response.data.sys.country;
  document.querySelector(".weather-description").innerHTML =
    response.data.weather[0].description;
  let feelsLikeTemperature = Math.round(response.data.main.feels_like);
  let feelsLikeDisplay = document.querySelector(".feels-like");
  feelsLikeDisplay.innerHTML = `Feels like: ${feelsLikeTemperature}°`;

  let windDescription = Math.round(response.data.wind.speed);
  let windDisplay = document.querySelector(".wind");
  windDisplay.innerHTML = `Wind speed: ${windDescription} m/s`;

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
