const apiKey = '22f98f2feff30bb3f7988a1dc02d9e66'; // Replace with your OpenWeatherMap API key
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value;
    getWeather(cityName);
});
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const cityName = cityInput.value;
        getWeather(cityName);
    }
});

async function getWeather(city) {
    if (!city) {
        weatherResult.innerHTML = 'Please enter a city name.';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = error.message;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const weatherDescription = weather[0].description;
    const temperature = main.temp;

    weatherResult.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Description: ${weatherDescription}</p>
    `;
}
