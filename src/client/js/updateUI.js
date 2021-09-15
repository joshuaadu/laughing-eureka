const updateUI = (data) => {
	const section = document.querySelector(".trip-display-section");
	const date = new Date(data.date);
	const dateString = new Intl.DateTimeFormat("en-GB", {
		dateStyle: "full",
	}).format(date);
	section.innerHTML = `
        <div class="trip-info-card">
        <div class="destination-geo-info">
            <img class="destination-image" src="${data.image}" alt="Photo of ${data.name}">
            <ul class="main-info">
                <li class="destination-name">${data.name}, ${data.countryName}</li>
                <li class="trip-countdown">Trip is ${data.countDown}</li>
                <li class="trip-date">${dateString}</li>
            </ul>
            <ul class="temp-info">
                <li class="">
                    <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${data.icon}.png" alt="${data.weather} icon">
                </li>
                <li class="temp">${data.temp}</li>
            </ul>
        </div>
        <div class="weather-highlight-div">
            <ul class="hightlight-block">
                <li class="title">Wind staus</li>
                <li class="value">${data.wind_speed}mph</li>
                <li class="value">${data.wind_dir_code}</li>
            </ul>
            <ul class="hightlight-block">
                <li class="title">Air Pressure</li>
                <li class="value">${data.pressure}mb</li>
            </ul>
            <ul class="hightlight-block">
                <li class="title">Humidity</li>
                <li class="value">${data.humidity}%</li>
            </ul>
            <ul class="hightlight-block">
                <li class="title">Population</li>
                <li class="value">${data.population}</li>
            </ul>
        </div>
        </div>`;

	console.log(data);
};

export { updateUI };
// module.exports = updateUI;
