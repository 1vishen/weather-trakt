//main js code for the weather-trakt app

const apiKey = "059efa9e9bc9c515031e2f68eb49d4a5";
//const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&units=metric&appid=${apiKey}`;

const form = document.querySelector('.search-form');
const searchBox = document.querySelector('.search-box');

let Darjeeling = "Darjeeling";
getLatLon(Darjeeling);

function handleSubmit(event) {
    event.preventDefault(); //to prevent the default behaviour of the form which is reloading instantly
    getLatLon(searchBox.value);
}

form.addEventListener('submit', handleSubmit);

async function getLatLon(city) {
    const apiLatLonUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiLatLonUrl);
    const dataLatLon = await response.json();

    console.log(dataLatLon);

    const lat = dataLatLon[0].lat;
    const lon = dataLatLon[0].lon;

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

    const wind = Math.round((weatherData.wind.speed) * (18 / 5));
    const humidity = weatherData.main.humidity;
    const pressure = weatherData.main.pressure;

    const visibility = (weatherData.visibility) / 1000; //to convert m to km

    const maxTemp = weatherData.main.temp_max;
    const minTemp = weatherData.main.temp_min;

    let result = unixToHuman(weatherData.dt);
    console.log(result);
    const todayDate = result.dateNow;
    const todayMonth = result.month;
    const todayDay = result.dayOfWeek;

    result = unixToHuman(weatherData.sys.sunrise);
    console.log(result);
    const sunrise = result.hours + ":" + result.minutes;

    result = unixToHuman(weatherData.sys.sunset);
    console.log(result);
    const sunset = result.hours + ":" + result.minutes;

    const weatherId = weatherData.weather[0].id;
    const dayNightByIcon = weatherData.weather[0].icon;

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

    updateSite(cityName, temp, description, todayDate, todayMonth, todayDay, wind, humidity, pressure, visibility, sunrise, sunset, maxTemp, minTemp);
    updateIcon(weatherId, dayNightByIcon);

}

function updateSite(cityName, temp, description, todayDate, todayMonth, todayDay, wind, humidity, pressure, visibility, sunrise, sunset, maxTemp, minTemp) {
    document.getElementById('city-info-t').textContent = cityName;
    document.getElementById('current-temperature-t').textContent = temp;
    document.getElementById('description').textContent = description;
    document.getElementById('date-info-t').textContent = todayDate;
    document.getElementById('month-info-t').textContent = todayMonth;
    document.getElementById('day-info-t').textContent = todayDay;
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

function unixToHuman(unixTime) {
    const date = new Date(unixTime * 1000);

    const year = date.getFullYear();
    const dateNow = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const dayNumber = date.getDay();
    const monthNumber = date.getMonth();
    const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const allWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const month = allMonths[monthNumber];
    const dayOfWeek = allWeekDays[dayNumber];

    return {
        year: year,
        month: month,
        dateNow: dateNow,
        dayOfWeek: dayOfWeek,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }

}

function updateIcon(weatherId, dayNightByIcon) {


    let dayNight;
    if (dayNightByIcon === "01d" || dayNightByIcon === "02d" || dayNightByIcon === "03d" ||
        dayNightByIcon === "04d" || dayNightByIcon === "09d" || dayNightByIcon === "10d" ||
        dayNightByIcon === "11d" || dayNightByIcon === "13d" || dayNightByIcon === "50d") {
        dayNight = "day";
    }
    else {
        dayNight = "night";
    }

    console.log(dayNight);

    let iconSrc;

    if (weatherId <= 299) {
        if (dayNight === "day") {
            iconSrc = `images/animated/11d.svg`;
        }
        else {
            iconSrc = `images/animated/11n.svg`;
        }
    }
    else if (weatherId >= 300 && weatherId <= 399) {
        if (dayNight === "day") {
            iconSrc = `images/animated/10d.svg`;
        }
        else {
            iconSrc = `images/animated/10n.svg`;
        }    
    }
    else if (weatherId >= 500 && weatherId <= 599) {
        if (dayNight === "day") {
            iconSrc = `images/animated/09d.svg`;
        }
        else {
            iconSrc = `images/animated/09n.svg`;
        }   
    }
    else if (weatherId >= 600 && weatherId <= 699) {
        if (dayNight === "day") {
            iconSrc = `images/animated/13d.svg`;
        }
        else {
            iconSrc = `images/animated/13n.svg`;
        }    
    }
    else if (weatherId >= 700 && weatherId <= 799) {
        if (dayNight === "day") {
            iconSrc = `images/animated/50d.svg`;
        }
        else {
            iconSrc = `images/animated/50n.svg`;
        }    
    }
    else if (weatherId >= 801 && weatherId <= 899) {
        if (dayNight === "day") {
            iconSrc = `images/animated/02d.svg`;
        }
        else {
            iconSrc = `images/animated/02n.svg`;
        }    
    }
    else if (weatherId === 800) {
        if (dayNight === "day") {
            iconSrc = `images/animated/01d.svg`;
        }
        else {
            iconSrc = `images/animated/01n.svg`;
        }    
    }
    else {
        iconSrc = `images/animated/50d.svg`;
    }

    const weatherIcon = document.getElementById('dynamic-current-weather-icon-t');
    weatherIcon.src = iconSrc;

    console.log(weatherId);

    document.getElementById('main-heading-t').textContent = "Today's Overview";

}
