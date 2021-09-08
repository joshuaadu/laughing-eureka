var path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('Example app listening on port 8082!')
})


app.post('/travel-info', (req, res) => {
    let destinationData = {}
    const destination = req.body.destination
    console.log(req.body)
    getGeoData(destination)
    .then(data => {
        Object.assign(destinationData, data.geonames[0])
        // console.log(data.geonames[0])
        return [data.geonames[0].lat, data.geonames[0].lng]
    })
    .then(([lat, lon]) => getWeatherData(lat, lon))
    .then(result => {
        Object.assign(destinationData, {
            sunrise: result.data[0].sunrise,
            sunset: result.data[0].sunset,
            timezone: result.data[0].timezone,
            presure: result.data[0].pres,
            wind_speed: result.data[0].wind_spd,
            temp: result.data[0].temp,
            apparent_temp: result.app_temp,
            weather: result.data[0].weather.description,
            weather_icon: result.data[0].weather.icon
        })
        res.send(destinationData)
    })
    // res.send()
    
})


// Get geographic data
const getGeoData = async (name) => {
    const username = process.env.geoNameUsername
    const geoNameURL = `http://api.geonames.org/search?name=${name}&maxRows=1&type=json&username=${username}`
    const response = await fetch (encodeURI(geoNameURL))
    try {
        return await response.json()
    } catch (error) {
        console.log('error', error)
    }
}

// Get weather data
const getWeatherData = async (lat,lon) => {
    const apiKey = process.env.weatherBitApiKey
    const url = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lat=${lat}&lon=${lon}`
    // console.log(lat, lon)
    const response = await fetch (encodeURI(url))
    try {
        return await response.json()
    } catch (error) {
        console.log('error', error)
    }
}