import setDisplay from './display.js'

const API_KEY = "ed6fe5f7021748a6706212149dc2ef03";

export const defaultFetch = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos);
      let long = pos.coords.longitude;
      let lat = pos.coords.latitude;
      let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`;
      fetching(api);
    });
  }
};
export const perInputFetch = (e, input) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      let city_name = input.value;
      console.log(input.value);
      console.log("city: " + city_name.length);
      let api = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${API_KEY}`;
      fetching(api);
    }
};

const fetching = (api) => {
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then(setDisplay);
};

