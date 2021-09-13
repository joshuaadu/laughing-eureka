const updateUI = (data) => {
	const section = document.querySelector(".trip-display-section");

	section.innerHTML = `
        <div class="trip-info-card">
        <div class="destination-geo-info">
            <img class="destination-image" src="${data.image}" alt="Photo of ${data.name}">
            <ul class="main-info">
                <p class="destination-name">${data.name}, ${data.countryName}</p>
                <p class="trip-date">Trip is ${data.countDown}</p>
            </ul>
            <ul class="temp-info">
                <li class="temp">${data.temp}</li>
                <li class="">
                    <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${data.icon}.png" alt="${data.weather} icon">
                </li>
            </ul>
        </div>
        <div class="weather-highlight-div">
            
        </div>
        </div>`;

	console.log(data);
};

export { updateUI };
