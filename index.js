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
  console.log(response);
  let cityInputTemp = document.querySelector("#current-temp");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherDescription = document.querySelector("#weather-description");
  let inconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  cityInputTemp.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  weatherDescription.innerHTML = response.data.weather[0].description;
  inconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function getForecast(coordinates) {
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;

  let city = `${cityInput.value}`;
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

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
    let inconElement = document.querySelector("#icon");
    fahrenheitTemperature = response.data.main.temp;

    temperature.innerHTML = Math.round(response.data.main.temp);
    h1.innerHTML = `${city}`;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    weatherDescription.innerHTML = response.data.weather[0].description;
    inconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    displayForecast(response.data.coords);
  }
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}
function navigatorPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", navigatorPosition);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//adding in forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forcastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div weather-forecast-date">
          ${formatDay(forecastDay.dt)}</div>
            <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                width="30"
               />
                <div>
                    <span class="forecast-high-temperature">${Math.round(
                      forecastDay.temp.max
                    )}° </span>
              <span class="forecast-low-temperature">${Math.round(
                forecastDay.temp.min
              )}° </span>
          </div>
        </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forcastElement.innerHTML = forecastHTML;
}

let iconCodePathConverter = {
  "01d": "img/sunny.png",
  "01n": "img/sunny.png",
  "02d": "img/partly-cloudy.png",
  "02n": "img/partly-cloudy.png",
  "03d": "img/cloudy.png",
  "03n": "img/cloudy.png",
  "04d": "img/cloudy.png",
  "04n": "img/cloudy.png",
  "09d": "img/rainy.png",
  "09n": "img/rainy.png",
  "10d": "img/rainy.png",
  "10n": "img/rainy.png",
  "11d": "img/thunderstorm.png",
  "11n": "img/thunderstorm.png",
  "13d": "img/snow.png",
  "13n": "img/snow.png",
  "50d": "img/mist.png",
  "50n": "img/mist.png",
};
