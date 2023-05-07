// telling current time
let now = new Date();

let h2 = document.querySelector("h2");

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h2.innerHTML = `${day} ${hour}:${minutes}`;

//search bar input
function displayWeather(response) {
  let cityInputTemp = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#current-temp");
  h1.innerHTML = `${cityInputTemp}°C`;
}
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  let city = `${cityInput.value}`;

  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", search);

//current location button is working!!!!!!!!!!!!!!
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);

    let h3 = document.querySelector("h3");
    h3.innerHTML = ` ${temperature} °C`;
    let city = response.data.name;
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${city}`;
  }
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}
function navigatorPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", navigatorPosition);