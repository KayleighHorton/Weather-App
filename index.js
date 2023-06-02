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
  console.log(response.data);
  let cityInputTemp = document.querySelector("#current-temp");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherDescription = document.querySelector("#weather-description");
  let inconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityInputTemp.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  weatherDescription.innerHTML = response.data.weather[0].description;
  inconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

//current location button is working!!
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  function showTemperature(response) {
    let temperature = document.querySelector("#current-temp");
    let city = response.data.name;
    let h1 = document.querySelector("h1");
    let windSpeed = document.querySelector("#wind-speed");
    let weatherDescription = document.querySelector("#weather-description");

    celsiusTemperature = response.data.main.temp;

    temperature.innerHTML = Math.round(response.data.main.temp);
    h1.innerHTML = `${city}`;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    weatherDescription.innerHTML = response.data.weather[0].description;
  }
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}
function navigatorPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", navigatorPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

//adding in forecast
function displayForecast() {
  let forcastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
    <div class="forecast-next-day">
      ${day}
      <div>
        <img
          src="images/partly-cloudy.png"
          alt="forecast icon"
          width="100"
        />
      </div>
      <span class="forecast-high-temperature">High</span>
      <span class="forecast-low-temperature">Low</span>
    </div>
  </div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
