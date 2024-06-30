const apiKey = "973f61eed37d43ae8fe90546242706";
let currentUnit = "C"; // Default unit is Celsius

document
  .getElementById("locationForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const location = document.getElementById("locationInput").value;
    document.getElementById("loading").style.display = "block";
    document.getElementById("weatherInfo").innerHTML = "";
    await getWeather(location);
  });

document.getElementById("toggleUnit").addEventListener("click", function () {
  currentUnit = currentUnit === "C" ? "F" : "C";
  const button = document.getElementById("toggleUnit");
  button.innerText =
    currentUnit === "C" ? "Switch to Fahrenheit" : "Switch to Celsius";
  const weatherInfoDiv = document.getElementById("weatherInfo");
  if (weatherInfoDiv.innerHTML) {
    // If weather information is already displayed, refresh it with the new unit
    const location = weatherInfoDiv.getAttribute("data-location");
    const weatherData = JSON.parse(
      weatherInfoDiv.getAttribute("data-weather-data")
    );
    displayWeather(weatherData);
  }
});

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
    );
    const data = await response.json();
    document.getElementById("loading").style.display = "none";
    console.log(data);
    const weatherData = processWeatherData(data);
    displayWeather(weatherData);
    document
      .getElementById("weatherInfo")
      .setAttribute("data-location", location);
    document
      .getElementById("weatherInfo")
      .setAttribute("data-weather-data", JSON.stringify(weatherData));
  } catch (error) {
    document.getElementById("loading").style.display = "none";
    console.error("Error fetching weather data:", error);
    document.getElementById("weatherInfo").innerHTML =
      "Error fetching weather data.";
  }
}

function processWeatherData(data) {
  return {
    location: data.location.name,
    region: data.location.region,
    country: data.location.country,
    temperatureC: data.current.temp_c,
    temperatureF: data.current.temp_f,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
  };
}

function displayWeather(weatherData) {
  const weatherInfoDiv = document.getElementById("weatherInfo");
  const temperature =
    currentUnit === "C" ? weatherData.temperatureC : weatherData.temperatureF;
  const unit = currentUnit === "C" ? "°C" : "°F";
  weatherInfoDiv.innerHTML = `
        <h2>${weatherData.location}, ${weatherData.region}, ${weatherData.country}</h2>
        <img src="${weatherData.icon}" alt="${weatherData.condition}">
        <p>Temperature: ${temperature}${unit}</p>
        <p>Condition: ${weatherData.condition}</p>
    `;
}
