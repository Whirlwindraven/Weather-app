const apiKey = 'EPPB4746tUOr12IhKAniCfeJjm3o3Oqv';
const placeForm = document.querySelector('form');
const card = document.querySelector('.card');
const dets = document.querySelector('.details')
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')
const forecastDiv = document.getElementById('forecast');
const getWeather = async (identification) => {
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${identification}?apikey=${apiKey}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};

const getPlace = async (city) => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${apiKey}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};

const updatePlace = async (place) => {
    const cityDetails = await getPlace(place);
    const weather = await getWeather(cityDetails.Key);  // use cityDetails.Key as parameter
    return { cityDetails, weather };
};

const getForecast = async (cityKey) => {
    const base = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const query = `${cityKey}?apikey=${apiKey}&metric=true`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data.DailyForecasts;
  }
  
  const updateForecastUI = (forecasts) => {
    const forecastContainer = document.querySelector('.forecast');
    forecastContainer.innerHTML = '';
  
    forecasts.forEach(forecast => {
      const date = new Date(forecast.Date);
      const dayOfWeek = date.toLocaleString('default', { weekday: 'short' });
      const iconSrc = `./images/icons/${forecast.Day.Icon}.svg`;
      const minTemp = forecast.Temperature.Minimum.Value;
      const maxTemp = forecast.Temperature.Maximum.Value;
      const windSpeed = forecast.Day.Wind.Speed.Value;
      const humidity = forecast.Day.Humidity;
  
      const forecastCard = document.createElement('div');
      forecastCard.classList.add('col-md-2');
      forecastCard.innerHTML = `
      <div class="card forecast-card">
        <div class="card-body">
          <h5 class="card-title">${dayOfWeek}</h5>
          <img class="forecast-icon" src="${iconSrc}" alt="${forecast.Day.IconPhrase}">
          <p class="card-text">${minTemp}&deg;C - ${maxTemp}&deg;C</p>
          <p class="card-text">Wind: ${windSpeed} km/h</p>
          <p class="card-text">Humidity: ${humidity}%</p>
        </div>
      </div>
    `;

    forecastContainer.appendChild(forecastCard);
  });
}

const updateUI = (data) => {

    const cityDetails = data.cityDetails;
    const weather = data.weather; 

    // update weather details template 
dets.innerHTML = ` 
<h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
            `;

   const iconSrc = weather.WeatherIcon ? `./images/icons/${weather.WeatherIcon}.svg` : '';
   icon.setAttribute('src', iconSrc);
            
    let timeSrc= null;
    if(weather.IsDayTime){
        timeSrc = 'images/day.svg';
     } else {
        timeSrc = 'images/night.svg';
    }
     time.setAttribute('src', timeSrc);

 // remove the d-none class if present 
     if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
     }

};

placeForm.addEventListener('submit', async e => {
  e.preventDefault();

  // getting the area value
  const place = placeForm.place.value.trim();
  placeForm.reset();

  // update the city value
  updatePlace(place)
      .then(data => updateUI(data))
      .catch(err => console.log(err));

  // updating local storage
  localStorage.setItem('location', place);
});

if (localStorage.getItem('location')) {
  updatePlace(localStorage.getItem('location'))
      .then(data => updateUI(data))
      .catch(err => console.log(err));
}
