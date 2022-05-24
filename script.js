let weather = {
    "apiKey": "ce3e9e4b069b96c2ba48109ba76ff11c",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
            .then((Response) => Response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerHTML = name + "," + " " + country;// innerText or innerHTML
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"// icon-ի խնդիր
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind speed: " + speed + "km/h";
    },
    search: function () {
        this.fetchWeather(document.querySelector("#search_bar").value);
    }
};

// document.querySelector("#search button").addEventListener('click', function () {
//     weather.search();
// });


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

let search_btn = document.querySelector("div.search > button")

search_btn.onclick = (e) => {
    e.preventDefault()
    weather.search()
};
document.querySelector("#search_bar").addEventListener("keyup", function (event) {
    console.log(event.key)
    if (event.key == "Enter") {
        event.preventDefault()

        search_btn.click();

    }
})
