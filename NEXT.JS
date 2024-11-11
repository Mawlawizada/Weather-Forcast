const apiKey = 'fba8a7d236910c4909511908c5ea41f8'; // Your OpenWeather API key

        // Default cities to display
        const defaultCities = ['New York', 'London', 'Tokyo', 'Sydney', 'Dubai'];

        // Function to fetch weather data for a city
        async function fetchWeather(city) {
            try {
                // Construct the weather API URL
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

                // Fetch weather data from OpenWeatherMap API
                const response = await fetch(weatherUrl);
                const data = await response.json();

                // Check if the response is valid and contains weather data
                if (data.cod === 200) {
                    return data;
                } else {
                    console.error("City not found or error fetching data.");
                    return null;
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
                return null;
            }
        }

        // Function to display the weather data on the page
        function displayWeather(weatherData) {
            const weatherCards = document.getElementById('weatherCards');
            weatherCards.innerHTML = ''; // Clear existing weather cards

            weatherData.forEach(cityWeather => {
                const card = document.createElement('div');
                card.className = 'weather-card';

                card.innerHTML = `
                    <h3>${cityWeather.name}</h3>
                    <img src="https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}.png" alt="${cityWeather.weather[0].description}" />
                    <p><span>Temperature:</span> ${cityWeather.main.temp}°C</p>
                    <p><span>Condition:</span> ${cityWeather.weather[0].description}</p>
                    <p><span>Wind Speed:</span> ${cityWeather.wind.speed} m/s</p>
                    <p><span>Humidity:</span> ${cityWeather.main.humidity}%</p>
                `;
                weatherCards.appendChild(card);
            });
        }

        // Function to search and display weather for a city
        async function searchCity() {
            const cityInput = document.getElementById('cityInput').value;
            if (cityInput) {
                const weatherData = await fetchWeather(cityInput);
                if (weatherData) {
                    displayWeather([weatherData]);
                }
            }
        }

        // Function to load the default cities on page load
        async function loadDefaultCities() {
            const weatherData = [];
            for (let city of defaultCities) {
                const cityWeather = await fetchWeather(city);
                if (cityWeather) {
                    weatherData.push(cityWeather);
                }
            }
            displayWeather(weatherData);
        }

        // Load default cities when the page is loaded
        loadDefaultCities();
