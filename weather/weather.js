const request = require('request');

var getWeather = (lat, lng, callback) => {
	request({
		url: `https://api.darksky.net/forecast/4bfab1022f8e7d680a4f4c19a51b0d16/${lat},${lng}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to Forcast.io servers.');
		} else if (response.statusCode === 404) {
			callback('Unable to fetch weather.');
		} else if (response.statusCode === 200) {
			callback(undefined, `The current temperature is ${body.currently.temperature} and it feels like ${body.currently.apparentTemperature}`);
		}
	});
};

module.exports = {
	getWeather
};