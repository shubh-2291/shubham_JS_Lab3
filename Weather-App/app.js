const searchNode = document.querySelector("#search");
const errorNode = document.querySelector('#error');

searchNode.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.key === 'Enter') {
        getDataFromWeatherApi(searchNode.value);
    }
}

function setError(error) {
    // errorNode.style.display = 'block';
    errorNode.style.display = 'block';
    errorNode.innerText = error.message;
}

function getDataFromWeatherApi(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7e3f21edee540e6110af347b55eb1ab2`)
        .then(response => response.json())
        .then(response => displayResults(response));
}

function displayResults(weatherData) {

    if (weatherData.cod === '404') {
        errorNode.style.display = 'block';
        errorNode.innerText = weatherData.message;
    } else {
        errorNode.style.display = 'none';

        const city = document.querySelector('#city');
        city.innerText = `${weatherData.name} , ${weatherData.sys.country}`;

        const temperature = document.querySelector('#temperature');
        temperature.innerHTML = `${Math.round(weatherData.main.temp)}<sup>o</sup>C`;

        const tempDesc = document.querySelector('#temp-desc');
        tempDesc.innerText = `${weatherData.weather[0].main}`

        const highLow = document.querySelector('#high-low');
        highLow.innerHTML = `${Math.round(weatherData.main.temp_max)}<sup>o</sup>C / ${Math.round(weatherData.main.temp_min)}<sup>o</sup>C`;

        const date = document.querySelector('#date');
        date.innerText = dateBuilder();
    }

}

function dateBuilder() {
    let now = new Date();

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
    let Months = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = now.getDay();
    let date = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();

    return `${days[day]} ${date} ${Months[month]} ${year}`;
}
