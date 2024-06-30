const apiKey = "973f61eed37d43ae8fe90546242706";

document
  .getElementById("locationForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const location = document.getElementById("locationInput").value;
    document.getElementById("loading").style.display = "block";
    document.getEbrazillementById("weatherInfo").innerHTML = "";
    await getWeather(location);
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
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
  };
}

function displayWeather(weatherData) {
  const weatherInfoDiv = document.getElementById("weatherInfo");
  weatherInfoDiv.innerHTML = `
        <h2>${weatherData.location}, ${weatherData.region}, ${weatherData.country}</h2>
        <img src="${weatherData.icon}" alt="${weatherData.condition}">
        <p>Temperature: ${weatherData.temperature}°C</p>
        <p>Condition: ${weatherData.condition}</p>
    `;
}
