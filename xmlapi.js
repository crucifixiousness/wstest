// Fetch and parse the XML file
function loadXMLData() {
  fetch('shoe_brands.xml')
      .then(response => response.text())
      .then(xmlData => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlData, "text/xml");

          // Get all shoe brands from the XML
          const brands = xmlDoc.getElementsByTagName("Brand");
          const brandDetails = [];

          // Loop through each brand and extract details
          Array.from(brands).forEach(brand => {
              const name = brand.getElementsByTagName("Name")[0]?.textContent || "Unknown";
              const model = brand.getElementsByTagName("Model")[0]?.textContent || "Unknown";
              const unitsAvailable = brand.getElementsByTagName("UnitsAvailable")[0]?.textContent || "N/A";

              brandDetails.push({
                  name,
                  model,
                  unitsAvailable
              });
          });

          // After parsing, display the data
          displayBrandsAndStock(brandDetails);
      })
      .catch(error => console.error("Error fetching the XML file:", error));
}

// Function to display the brands and their stock data
function displayBrandsAndStock(brands) {
  const container = document.getElementById('brand-list');
  container.innerHTML = ""; // Clear previous content
  brands.forEach(brand => {
      const brandElement = document.createElement('div');
      brandElement.classList.add('brand-item');
      brandElement.innerHTML = `
          <h3>${brand.name} - ${brand.model}</h3>
          <p>Units Available: ${brand.unitsAvailable}</p>
      `;
      container.appendChild(brandElement);
  });
}

// Fetch and display weather data
function fetchWeatherData(city = "Guimba, Nueva Ecija") {
  const apiKey = '30adb784f00643756bd4e9167c20ad5b';  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error("City not found");
          }
          return response.json();
      })
      .then(data => {
          const weatherDiv = document.getElementById("weather-info");
          weatherDiv.innerHTML = `
              <h3>Weather in ${city}</h3>
              <p>Temperature: ${data.main.temp}°C</p>
              <p>Condition: ${data.weather[0].description}</p>
          `;
      })
      .catch(error => {
          const weatherDiv = document.getElementById("weather-info");
          weatherDiv.innerHTML = `<p>${error.message}</p>`;
          console.error(error);
      });
}

// Add event listener for weather search
document.getElementById("search-weather").addEventListener("click", () => {
  const cityInput = document.getElementById("city-input").value.trim();
  if (cityInput) {
      fetchWeatherData(cityInput);
  } else {
      alert("Please enter a city name.");
  }
});

// Initialize on page load
loadXMLData();
fetchWeatherData();
