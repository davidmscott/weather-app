const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address for which to fetch weather',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

	var encAddress = encodeURIComponent(argv.address);
	var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encAddress}`;

	axios.get(geocodeUrl).then((response) => {
		if (response.data.status === "ZERO_RESULTS") {
			throw new Error('Unable to find that address.');
		}
		var lat = response.data.results[0].geometry.location.lat;
		var lng = response.data.results[0].geometry.location.lng;
		var weatherUrl = `https://api.darksky.net/forecast/4bfab1022f8e7d680a4f4c19a51b0d16/${lat},${lng}`
		console.log(response.data.results[0].formatted_address);
		return axios.get(weatherUrl);
	}).then((response) => {
		var temperature = response.data.currently.temperature;
		var apparentTemp = response.data.currently.apparentTemperature;
		console.log(`The current temperature is ${temperature} and it feels like ${apparentTemp}`);
	}).catch((error) => {
		if (error.code === 'ENOTFOUND') {
			console.log('Could not connect to API servers.');
		} else {
			console.log(error.message);
		}
	});