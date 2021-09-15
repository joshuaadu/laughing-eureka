var path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
	// res.sendFile('dist/index.html')
	res.sendFile(path.resolve("dist/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
	console.log("Example app listening on port 8082!");
});

app.post("/travel-info", (req, res) => {
	let destinationData = {};
	const destination = req.body.destination;
	destinationData.countDown = req.body.countDown;
	destinationData.date = req.body.date;

	// Get geographic data
	getGeoData(destination)
		.then((data) => {
			// Save geo data to destination data
			Object.assign(destinationData, data.geonames[0]);
			// console.log(data.geonames[0])
			console.log(destinationData);
			return [data.geonames[0].lat, data.geonames[0].lng];
		})
		.then(([lat, lon]) => {
			// Get weather data and image of destination
			return Promise.all([
				getWeatherData(lat, lon),
				getDestinationImage(destinationData),
			]);
		})
		.then((results) => {
			console.log(results[0]);
			const weatherResult = results[0].data[0];
			// Save weather data to destination data
			Object.assign(destinationData, {
				sunrise: weatherResult.sunrise,
				sunset: weatherResult.sunset,
				timezone: weatherResult.timezone,
				pressure: weatherResult.pres,
				wind_speed: weatherResult.wind_spd,
				temp: weatherResult.temp,
				apparent_temp: weatherResult.app_temp,
				weather: weatherResult.weather.description,
				icon: weatherResult.weather.icon,
				wind_dir_code: weatherResult.wind_cdir,
				humidity: weatherResult.rh,
			});
			res.send(destinationData);
		})
		.catch((error) => {
			// Report search parameter not found
			res.send({ result: "Location not found", found: false });
			console.log("error", error, "\nLocation not found");
		});

	// res.send()
});

// Get geographic data
const getGeoData = async (name) => {
	const username = process.env.geoNameUsername;
	const geoNameURL = `http://api.geonames.org/search?name=${name}&maxRows=1&type=json&username=${username}`;
	const response = await fetch(encodeURI(geoNameURL));
	try {
		return await response.json();
	} catch (error) {
		console.log("error", error);
	}
};

// Get weather data
const getWeatherData = async (lat, lon) => {
	const apiKey = process.env.weatherBitApiKey;
	const url = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lat=${lat}&lon=${lon}`;
	// console.log(lat, lon)
	const response = await fetch(encodeURI(url));
	try {
		return await response.json();
	} catch (error) {
		console.log("error", error);
	}
};

// Get destination image
const getDestinationImage = async (destination) => {
	const apiKey = process.env.pixabayApiKey;
	const destinationName = destination.name;
	const url = `https://pixabay.com/api/?key=${apiKey}&q=${destinationName}&category=places&image_type=photo&pretty=true`;
	console.log(destination.name, destination.countryName);
	const response = await fetch(encodeURI(url));
	try {
		const result = await response.json();
		destination.image = result.hits[0].webformatURL;
	} catch (error) {
		console.log("error", error);
	}
};

module.exports = app;
