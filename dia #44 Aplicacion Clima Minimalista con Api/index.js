const apiKey = "62d4f0ff0934fcca4a5d5bc126de2784";
const locButton = document.querySelector('.loc-button');
const todayInfo = document.querySelector('.today-info');
const todayWeatherIcon = document.querySelector('.today-weather i');
const todayTemp = document.querySelector('.weather-temp');
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
        const locationElement = document.querySelector('.today-info > div > span');
        locationElement.textContent = `${data.city.name}, ${data.city.country}`;

        const weatherDescriptionElement = document.querySelector('.today-weather > h3');
        weatherDescriptionElement.textContent = todayWeather;

        // UPDATE TODAYS INFO THE "DAYS-INFO" SECTION
        const todayPrecipitation = `${data.list[0].pop}%`;
        const todayHumidity = `${data.list[0].main.humidity}%`;
        const todayWindSpeed = `${data.list[0].wind.speed} km/h`;

        const dayInfoContainer = document.querySelector('.day-info');
        dayInfoContainer.innerHTML = `
            <div>
                <span class="title">PRECIPITATION</span>
                <span class="value">${todayPrecipitation} </span>
            </div>
            <div>
                <span class="title">HUMIDITY</span>
                <span class="value">${todayHumidity} </span>
            </div>
            <div>
                <span class="title">WIND SPEED</span>
                <span class="value">${todayWindSpeed} </span>
            </div>
        `

        // UPDATE NEXT 4 DAYS WEATHER
        const today = new Date();
        const nextDaysData = data.list.slice(1);

        const uniqueDays = new Set();
        let count = 0;
        daysList.innerHTML = '';
        for (const dayData of nextDaysData){
            const forecastDate = new Date(dayData.dt_txt);
            const dayAbbreviation = forecastDate.toLocaleDateString('en', { weekday: 'short'});
            const dayTemp = `${Math.round(dayData.main.temp)}°C`;
            const iconCode = dayData.weather[0].icon;

            // ENSURE THE DAY ISN'T DUPLICATE AND TODAY
            if(!uniqueDays.has(dayAbbreviation) && forecastDate.getDate() !== today.getDate()){
                uniqueDays.add(dayAbbreviation);
                daysList.innerHTML += `
                    <li>
                        <i class='bx bx-${weatherIconMap[iconCode]}'></i>
                        <span>${dayAbbreviation}</span>
                        <span class="day-temp">${dayTemp}</span>
                    </li>    
                `;
                count++;
            }

            // STOP AFTER GETTING 4 DISTINCT DAYS
            if (count === 4) break;
        }
    }).catch(error =>{
        alert(`Error fetching weather data: ${error} (Api Error)`);
    });
}

// FETCH WEATHER DATA ON DOCUMENT LOAD FOR DEFAULT LOCATION (GERMANY)

document.addEventListener('DOMContentLoaded', ()    =>{
    const defaultLocation = 'Chile';
    fetchWeatherData(defaultLocation);
});

locButton.addEventListener('click', () =>{
    const location = prompt('Enter a Location :');
    if(!location) return;
    
    fetchWeatherData(location);
    
})