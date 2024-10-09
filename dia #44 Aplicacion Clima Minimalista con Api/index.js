const apiKey = "62d4f0ff0934fcca4a5d5bc126de2784";
const locButton = document.querySelector('.loc-button');
const todayInfo = document.querySelector('.today-info');
const todayWeatherIcon = document.querySelector('.today-weather i');
const todayTemp = document.querySelector('weather-temp');
const daysList = document.querySelector('.days-list');

// MAPPING OF WEATHER CONDITION CODES TO ICON CLASS NAMES (DEPENDING ON OPENWHATER.API RESPONSE)
const weatherIconMap = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'sun',
    '02n': 'moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'cloud-rain',
    '09n': 'cloud-rain',
    '10d': 'cloud-rain',
    '10n': 'cloud-rain',
    '11d': 'cloud-lightning',
    '11n': 'cloud-lightning',
    '13d': 'cloud-snow',
    '13n': 'cloud-snow',
    '50d': 'water',
    '50n': 'water'
};

function fetchWeatherData(location){
    // CONSTRUC THE API URL WITH THE LOCATION AND APIKEY
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`

    // FETCH WEATHER DATA FROM API
    fetch(apiUrl).then(response => response.json()).then(data =>{
        // UPDATE TODAYS INFO
        const todayWeather = data.list[0].weather[0].description;
        const todayTemperature = `${Math.round(data.list[0].main.temp)}°C`;
        const todayWeatherIconCode = data.list[0].weather[0].icon;

        todayInfo.querySelector('h2').textContent = new Date().toLocaleDateString('en', { weekday: 'long' });
        todayInfo.querySelector('span').textContent = new Date().toLocaleDateString('en', { day: 'numeric',  month: 'long', year: 'numeric' });
        todayWeatherIcon.className = `bx bx-${weatherIconMap[todayWeatherIconCode]}`;
        todayTemp.textContent = todayTemperature;

        // UPDATE LOCATION AND WEATHER DESCRIPTION IN THE "LEFT-INFO" SECTION
        const locationElement = document.querySelector('today-info > div > span');
        locationElement.textContent = `${data.city.name}, ${data.city.country}`;

        const weatherDescriptionElement = document.querySelector('.today-weahter > h3');
        weatherDescriptionElement.textContent = todayWeather;

        // UPDATE TODAYS INFO THE "DAYS-INFO" SECTION
        const todayPrecipitation = `${data.list[0].pop}%`;
        const todayHumidity = `${data.list[0].main.humidity}%`;
        const todayWindSpeed = `${data.list[0].wind.speed} km/h`;

        const dayInfoContainer = document.querySelector('.day-info');
        dayInfoContainer.innerHTML = `
            <div>
                <span class"title">PRECIPITATION</span>
                <span class"value">PRECIPITATION</span>
        `
    })
}