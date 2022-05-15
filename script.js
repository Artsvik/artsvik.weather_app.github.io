let weather = {
    "apiKey": "ce3e9e4b069b96c2ba48109ba76ff11c",
    fetchWeather: function (city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
            .then((Response) => Response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in" + " " + name;// innerText or innerHTML
        //    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"// icon-ի խնդիր
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search_bar").value);
    }
};

document.querySelector(".search button").addEventListener('click', function () {
    weather.search();
});


// doesn't work 
// let tempElement = document.querySelector(".temp")
// tempElement.addEventListener('click', function () {
//     return (temp * 9 / 5) + 32;
// })

let tempElement = document.querySelector(".temp")
tempElement.addEventListener('click', function () {

    if (weather.temp.unit === "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temp.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit}° <span>F<span>`;
        weather.temp.unit = "fahrenheit"
    } else {
        tempElement.innerHTML = `${weather.temp.value}° <span>C<span>`;
        weather.temp.unit = "celsius"
    }
})

document.querySelector(".search_bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("London");