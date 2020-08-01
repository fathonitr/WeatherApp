window.addEventListener("load", () => {
  let long;
  let lat;
  const API_KEY = "ed6fe5f7021748a6706212149dc2ef03";
  const temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimezone = document.querySelector(".location-timezone");
  let api;
  let city_name = "";
  const fullDate = document.querySelector(".date");
  const fullTime = document.querySelector(".time");

  //TODO cleanup?

  const time = new Date();
  const day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "Mei",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  fullDate.textContent =
    day[time.getDay()] +
    " " +
    time.getDate() +
    " " +
    month[time.getMonth()] +
    " " +
    time.getFullYear();

  const addZero = (t) => {
    if (t < 10) {
      t = "0" + t;
    }
    return t;
  };

  const calculateTimeZone = (timeZone) => {
    let result = time.getUTCHours()+timeZone / 60 / 60;
    console.log(result);
    if (result > 24) {
      result =result-24;
      
    }
    return result;
  };

  //Start, using geolocation as default

  if (city_name.length === 0) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos);
        long = pos.coords.longitude;
        lat = pos.coords.latitude;
        api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`;
        fetching(api);
      });
    }
  }
//Event listener for input
  const input = document.querySelector(".search-bar");
  input.addEventListener("keypress", (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      city_name = input.value;
      console.log(input.value);
      console.log("ciy: " + city_name.length);
      api = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${API_KEY}`;
      fetching(api);
    }
  });

  
  //Function to fetch, while setting the time and icon

  const fetching = (api) => {
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        //const
        temperatureDegree.textContent = Math.round(data.main.temp);
        locationTimezone.textContent = data.name;
        temperatureDescription.textContent = data.weather[0].description;
        const iconId = data.weather[0].main;

        fullTime.textContent =
          "Current Time: " +
          addZero(calculateTimeZone(data.timezone)) +
          ":" +
          addZero(time.getUTCMinutes());

        setIcon(iconId, document.querySelector(".iconID"), data.timezone);
        console.log(iconId);
      });
  };

  function setIcon(icon, iconID, timeZone) {
    const skycons = new Skycons({ color: "pink" });

    let currentIcon; //don't use const, because it need initial value

    if (icon === "Clouds") {
      currentIcon = "PARTLY_CLOUDY";
    } else {
      currentIcon = icon.toUpperCase();
    }
    if (timeZone > 12) {
      currentIcon = currentIcon + "_DAY";
    } else {
      currentIcon = currentIcon + "_NIGHT";
    }
    console.log(currentIcon);
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
