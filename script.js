const weatherApiKey = '1eff8f022ebfb6cb999084a1b0320d7f';
const newsApiKey = '0fa68e84ab5944f7b93458a4c95ab7dd';

function fetchWeather() {
    // Chapel Hill, NC coordinates
    const latitude = 35.9132;
    const longitude = -79.0558;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`;
    console.log(`Requesting weather data from: ${url}`); // Log the request URL for debugging

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data received:', data); // Log the received data
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
            document.getElementById('weather-description').textContent = `Weather: ${data.weather[0].description}`;
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            document.getElementById('weather-description').textContent = `Failed to load weather data: ${error}`;
        });
}

document.addEventListener('DOMContentLoaded', fetchWeather);

function fetchNews() {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`)
        .then(response => response.json())
        .then(data => {
            const newsList = document.getElementById('news-list');
            newsList.innerHTML = '';
            data.articles.forEach(article => {
                const li = document.createElement('li');
                li.textContent = article.title;
                newsList.appendChild(li);
            });
        });
}

fetchWeather();
fetchNews();
