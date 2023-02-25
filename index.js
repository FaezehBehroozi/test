let currentDate = new Date();
let h5 = document.querySelector("h5");
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
let hour = currentDate.getHours();
let min = currentDate.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (min < 10) {
  min = `0${min}`;
}
h5.innerHTML = `${day} ${hour}:${min}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let description = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let cityTemp = document.querySelector("#show-temperature");
  cityTemp.innerHTML = `${temperature}`;
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${cityName}`;
  let h6 = document.querySelector("h6");
  h6.innerHTML = `${description}`;
  let humidityResult = document.querySelector("#humidity");
  humidityResult.innerHTML = `Humidity: ${humidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind: ${wind} km/h`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city-name");
  let units = "Metric";
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchResult = document.querySelector("#search-city");
searchResult.addEventListener("click", searchCity);

function CurrentTemperature(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "Metric";
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(CurrentTemperature);
}

let showCurrentTemp = document.querySelector("#current-button");
showCurrentTemp.addEventListener("click", showPosition);
