const apiKey = 'EPPB4746tUOr12IhKAniCfeJjm3o3Oqv';


const getWeather = async (identification) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${identification}?apikey=${apiKey}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}




const getPlace = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${apiKey}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

getPlace('newyork')
.then(data => {
    return getWeather(data.apiKey);
}).then(data => {
    console.log(data);
})
.catch(error => console.log(error));