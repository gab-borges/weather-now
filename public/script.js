const apiURL = "/api/weather?city=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiURL + city);

        if (!response.ok) {
            if (response.status === 404) {
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
                return;
            }
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Atualiza os elementos HTML
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = `${Math.round(
            data.main.temp
        )}ºC`;

        document.querySelector(
            ".humidity"
        ).textContent = `${data.main.humidity}%`;

        document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

        // Atualiza o ícone
        weatherIcon.src = `assets/${data.weather[0].main.toLowerCase()}.png`;

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error("Error in requisition:", error);
    }
}

const search = () => {
    console.log("A");
    checkWeather(searchBox.value);
};
