document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();
    const city = document.getElementById('city').value;
    fetchWeather(city);
});

const getFormattedTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    return formattedTime;
};

function fetchWeather(city) {
    const apiKey = 'ab593c71bf96a79c5d6392880963cf40';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weather = data.weather[0];
            const main = data.main;
            const wind = data.wind;
            const sys = data.sys;

            document.getElementById('cityname').innerText = city;
            document.getElementById('temp').innerText = main.temp;
            document.getElementById('min_temp').innerText = main.temp_min;
            document.getElementById('max_temp').innerText = main.temp_max;
            document.getElementById('humidity').innerText = main.humidity;
            document.getElementById('cloud_pct').innerText = weather.description; // using description as cloud percentage not available
            document.getElementById('wind_speed').innerText = wind.speed;
            document.getElementById('wind_degrees').innerText = wind.deg;
            document.getElementById('sunrise').innerText = getFormattedTime(sys.sunrise);
            document.getElementById('sunset').innerText = getFormattedTime(sys.sunset);
        })
        .catch(error => console.error('Error fetching the weather data:', error));
}

// List of popular places
const popularPlaces = ['Beijing', 'Hyderabad', 'Chennai', 'New York', 'London', 'Adelaide'];

function fetchWeatherForPopularPlaces() {
    const apiKey = 'ab593c71bf96a79c5d6392880963cf40';

    popularPlaces.forEach(city => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const weather = data.weather[0];
                const main = data.main;
                const wind = data.wind;
                const sys = data.sys;

                const row = document.querySelector(`tbody tr[data-city="${city}"]`);
                row.querySelector('.cloud_pct').innerText = weather.description; // using description as cloud percentage not available
                row.querySelector('.feels_like').innerText = main.feels_like;
                row.querySelector('.humidity').innerText = main.humidity;
                row.querySelector('.max_temp').innerText = main.temp_max;
                row.querySelector('.min_temp').innerText = main.temp_min;
                row.querySelector('.sunrise').innerText = getFormattedTime(sys.sunrise);
                row.querySelector('.sunset').innerText = getFormattedTime(sys.sunset);
                row.querySelector('.temp').innerText = main.temp;
                row.querySelector('.wind_degrees').innerText = wind.deg;
                row.querySelector('.wind_speed').innerText = wind.speed;
            })
            .catch(error => console.error(`Error fetching the weather data for ${city}:`, error));
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetchWeather("Bhubaneswar");
    fetchWeatherForPopularPlaces();
});
