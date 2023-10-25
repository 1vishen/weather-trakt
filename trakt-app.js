//main js code for the weather-trakt app

const apiKey = "059efa9e9bc9c515031e2f68eb49d4a5";
//const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&units=metric&appid=${apiKey}`;

const form = document.querySelector('.search-form');
const searchBox = document.querySelector('.search-box');

let lat;
let lon;
let dataLatLon;
let cityName, temp, description, todayDate, wind, humidity, pressure, visibility, sunrise, sunset, maxTemp, minTemp;

function handleSubmit(event) {
    event.preventDefault(); //to prevent the default behaviour of the form which is reloading instantly
    getLatLon(searchBox.value);
}

form.addEventListener('submit', handleSubmit);

async function getLatLon(city) {
    const apiLatLonUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiLatLonUrl);
    const dataLatLon = await response.json();

    console.log(dataLatLon);

    let lat = dataLatLon[0].lat;
    let lon = dataLatLon[0].lon;

    getWeather(lat, lon, dataLatLon);

}

async function getWeather(lat, lon, dataLatLon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    const weatherData = await response.json();

    console.log(weatherData);

    updateData(dataLatLon, weatherData);

}

function updateData(dataLatLon, weatherData) {
    const cityName = dataLatLon[0].name;
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    
    const todayDate = weatherData.timezone;
    
    const wind = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    const pressure = weatherData.main.pressure;
    const visibility = weatherData.visibility;
    const sunrise = weatherData.sys.sunrise;
    const sunset = weatherData.sys.sunset;
    const maxTemp = weatherData.main.temp_max;
    const minTemp = weatherData.main.temp_min;

    console.log(cityName);
    console.log(temp);
    console.log(description);
    console.log(todayDate);
    console.log(wind);
    console.log(humidity);
    console.log(pressure);
    console.log(visibility);
    console.log(sunrise);
    console.log(sunset);
    console.log(maxTemp);
    console.log(minTemp);

    updateSite(cityName, temp, description, todayDate, wind, humidity, pressure, visibility, sunrise, sunset, maxTemp, minTemp);

}

function updateSite(cityName, temp, description, todayDate, wind, humidity, pressure, visibility, sunrise, sunset, maxTemp, minTemp) {
    document.getElementById('city-info-t').textContent = cityName;
    document.getElementById('current-temperature-t').textContent = temp;
    document.getElementById('description').textContent = description;
    document.getElementById('date-time-info-t').textContent = todayDate;
    document.getElementById('wind').textContent = wind;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('pressure').textContent = pressure;
    document.getElementById('visibility').textContent = visibility;
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;
    document.getElementById('maxTemp').textContent = maxTemp;
    document.getElementById('minTemp').textContent = minTemp;

    document.getElementById('maxTemp1').textContent = maxTemp;
    document.getElementById('minTemp1').textContent = minTemp;
    document.getElementById('maxTemp2').textContent = maxTemp;
    document.getElementById('minTemp2').textContent = minTemp;
    document.getElementById('maxTemp3').textContent = maxTemp;
    document.getElementById('minTemp3').textContent = minTemp;
    document.getElementById('maxTemp4').textContent = maxTemp;
    document.getElementById('minTemp4').textContent = minTemp;
    document.getElementById('maxTemp5').textContent = maxTemp;
    document.getElementById('minTemp5').textContent = minTemp;
}













