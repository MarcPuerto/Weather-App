const img_weather = document.getElementById("weather-icon");
const country = document.getElementsByClassName("country");
const city = document.getElementsByClassName("city");
const temp = document.getElementsByClassName("temp");
const localtime = document.getElementsByClassName("localtime");


async function getWeather(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=0e00de01a4854ff885784323231304&q=${location}`,
    {
      mode: "cors",
    }
  );

  if (response.status === 400) {
    throwErrorMsg();
  } else {
    const weatherData = await response.json();
    hideErrorMsg();
    let data = bindData(weatherData);
    displayData(data);
  }
}

function bindData(weatherData){

    const webData = {

        country: weatherData.location.country,
        name: weatherData.location.name,
        localtime: weatherData.location.localtime,
        temp: weatherData.current.temp_c,
        temp_img: weatherData.current.condition.icon
    }

    return webData;
}

const error = document.getElementById("error-msg");

function throwErrorMsg(){
    error.classList.remove("hide");
    error.classList.add("display");
}

function hideErrorMsg(){
    error.classList.add("hide");
    error.classList.remove("display");
}

function displayData(webData){
    country[0].textContent = webData.country
    city[0].textContent = webData.name
    temp[0].textContent = webData.temp + " Cº"
    localtime[0].textContent = webData.localtime
    img_weather.setAttribute("src", 'http://' + webData.temp_img);
}

const searchBar = document.getElementById('search');

searchBar.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    getWeather(searchBar.value);
  }
});

//init
getWeather("London");
