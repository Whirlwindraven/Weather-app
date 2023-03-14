const apiKey = 'EPPB4746tUOr12IhKAniCfeJjm3o3Oqv';
const placeForm = document.querySelector('form');
const card = document.querySelector('.card');
const dets = document.querySelector('.details')
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const getWeather = async (identification) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${identification}?apikey=${apiKey}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};

const getPlace = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
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

    let timeSrc= null;
    if(weather.IsDayTime){
        timeSrc = 'images/day.svg';
     } else {
        timeSrc = 'imgages/night.svg';
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
    .catch(err => console.log(err))
});
