function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const API_KEY = '426f011a3ed58caf2ac30b91272ce6ba';
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                lat: `${lat}`,
                lon: `${lon}`,
                appid: `${API_KEY}`,
                units: 'metric' 
            }
         })
        .then(res => res.data)
        .then(data => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
            city.innerText = data.name;
            weather.dataset.icon = mapWeatherIcon(data.weather[0].main);
            weather.innerText = `${data.weather[0].main} ${data.main.temp}℃`;
          });
}

function onGeoFail() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail);
setInterval(navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail), 1000 * 60 * 30);

function mapWeatherIcon(weatherMain) {
    switch (weatherMain) {
      case 'Clear':
        return '☀️';
      case 'Clouds':
        return '☁️';
      case 'Rain':
      case 'Drizzle':
        return '🌧️';
      case 'Thunderstorm':
        return '⛈️';
      case 'Snow':
        return '🌨️';
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
      case 'Sand':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
        return '🌫️';
      default:
        return '';
    }
  }
  