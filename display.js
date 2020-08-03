const setDisplay = (data) => {
    const temperatureDescription = document.querySelector(
      ".temperature-description"
    );
    const temperatureDegree = document.querySelector(".temperature-degree");
    const locationTimezone = document.querySelector(".location-timezone");
    const fullDate = document.querySelector(".date");
    const fullTime = document.querySelector(".time");
  
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
      let result = time.getUTCHours() + timeZone / 60 / 60;
      console.log(result);
      if (result > 24) {
        result = result - 24;
      }
      return result;
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
  }
  
  export default setDisplay;