async function setBackgroundAndCrypto() {
  try {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
    if (!res.ok) throw new Error("Failed to fetch nature image");
    const data = await res.json();
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;

    const cryptoRes = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
    if (!cryptoRes.ok) throw new Error("Failed to fetch Bitcoin data");
    const cryptoData = await cryptoRes.json();

    document.getElementById("bitcoin-top").innerHTML = `
      <img src=${cryptoData.image.small}/>
      <span>${cryptoData.name}</span>`;
    document.getElementById("bitcoin").innerHTML = `
      <p>🎯: #${cryptoData.market_data.current_price.ngn}</p>
      <p>👆: #${cryptoData.market_data.high_24h.ngn}</p>
      <p>👇: #${cryptoData.market_data.low_24h.ngn} </p>`;
  } catch (err) {
    console.error(err);
    document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)';
    document.getElementById("author").textContent = 'By: Dodi Achmad';
  }
}

setBackgroundAndCrypto();

function getCurrentTime() {
  const present = new Date();
  let hours = present.getHours();
  const minutes = present.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  function formatNumber(number) {
    return number < 10 ? '0' + number : number;
  }

  return `${hours}:${formatNumber(minutes)} ${amPm}`;
}

function updateClock() {
  document.getElementById("time").innerHTML = `<span>${getCurrentTime()}</span>`;
}

setInterval(updateClock, 1000);

async function fetchWeather() {
  navigator.geolocation.getCurrentPosition(async position => {
    try {
      const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`);
      if (!res.ok) throw new Error("Weather data not available");

      const data = await res.json();
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
          <img src=${iconUrl} />
          <p class="weather-temp">${Math.round(data.main.temp)}º</p>
          <p class="weather-city">${data.name}</p>
      `;
    } catch (err) {
      console.error(err);
    }
  });
}

fetchWeather();
