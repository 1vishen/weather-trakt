//main js code for the weather-trakt app

const apiKey = "059efa9e9bc9c515031e2f68eb49d4a5";
const apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

fetch(apiUrl)
.then(response => response.json)
