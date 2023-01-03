const placeForm = document.querySelector('form');

const updatePlace = async (place) => {

  const placeDets = await getPlace(place);
  const weather = await getWeather(placeDets.apiKey);
  
  return {
    placeDets: placeDets,
    weather: weather
  };

}

placeForm.addEventListener('submit', e => {
    e.preventDefault();

// getting the area value
const place = placeForm.place.value.trim();
placeForm.reset();

// update the city value

updatePlace(place);
})