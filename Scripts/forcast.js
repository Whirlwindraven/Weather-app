const apiKey = 'EPPB4746tUOr12IhKAniCfeJjm3o3Oqv';

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

const placeForm = document.querySelector('form');
placeForm.addEventListener('submit', async e => {
    e.preventDefault();

    // getting the area value
    const place = placeForm.place.value.trim();
    placeForm.reset();

    // update the city value
    const data = await updatePlace(place);
    console.log(data);
});
