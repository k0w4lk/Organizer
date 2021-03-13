const API_KEY = 'fc522175fa7782718e0d7c3b81e2f841';
const IMG_URL = `http://openweathermap.org/img/wn/10d@2x.png`;
const DEFAULT_CITY_NAME = 'Verkhnedvinsk';
const weatherIcon = document.querySelector('#weather-icon');
const weatherCity = document.querySelector('#weather-city');
const weatherTemperature = document.querySelector('#weather-temperature');
const feelsLikeText = document.querySelector('#feels-like');
const changeCity = document.querySelector('#change-city');
const changeCityButton = document.querySelector('#change-city-button');
const weatherBlock = document.querySelector('#weather-block');
const weatherPreload = document.querySelector('#weather-preload');
const weatherLoad = document.querySelector('#weather-load');

let savedCity = JSON.parse(localStorage.getItem('savedCity')) || {
  city: undefined,
};
function saveCity(cityName) {
  savedCity.city = cityName;
  localStorage.setItem('savedCity', JSON.stringify(savedCity));
}

async function getWeatherData(key, cityName) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`
    );
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

let temperature, feelsLike, icon, src, city;

getWeatherData(
  API_KEY,
  localStorage.getItem('savedCity') ? savedCity.city : DEFAULT_CITY_NAME
).then((res) => {
  temperature = res.main.temp;
  feelsLike = res.main.feels_like;
  icon = res.weather[0].icon;
  city = res.name;
  src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  weatherCity.innerText = `${city}: `;
  feelsLikeText.innerHTML = `Feels like: ${Math.round(feelsLike)} &#730;C`;
  weatherTemperature.innerHTML = `${Math.round(temperature)} &#730;C`;
  weatherIcon.src = src;
  changeCity.innerHTML = `${city} isn't your city?`;
  changeCityButton.innerText = 'Change.';
  weatherPreload.classList.add('l-main-header__weather-preloader_hidden');
  weatherLoad.classList.remove('l-main-header__weather-loaded_hidden');
});

const save = document.createElement('button');
save.innerText = 'Save';
const newCity = document.createElement('input');

changeCityButton.addEventListener('click', () => {
  weatherLoad.classList.add('l-main-header__weather-loaded_hidden');
  weatherBlock.append(newCity, save);
  save.style = `
  margin-left: 4px;
  `;
  newCity.focus();
  newCity.placeholder = 'Enter your city';
});

save.addEventListener('click', () => {
  getWeatherData(API_KEY, newCity.value).then((res) => {
    try {
      temperature = res.main.temp;
      feelsLike = res.main.feels_like;
      icon = res.weather[0].icon;
      city = res.name;
      src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      weatherCity.innerText = `${city}: `;
      feelsLikeText.innerHTML = `Feels like: ${Math.round(feelsLike)} &#730;C`;
      weatherTemperature.innerHTML = `${Math.round(temperature)} &#730;C`;
      weatherIcon.src = src;
      changeCity.innerHTML = `${city} isn't your city?`;
      changeCityButton.innerText = 'Change.';
      weatherPreload.classList.add('l-main-header__weather-preloader_hidden');
      weatherLoad.classList.remove('l-main-header__weather-loaded_hidden');
      saveCity(newCity.value);
      newCity.remove();
      save.remove();
    } catch {
      newCity.value = '';
      newCity.placeholder = 'City not found';
      newCity.focus();
      weatherBlock.append(errorText);
    }
  });
});
