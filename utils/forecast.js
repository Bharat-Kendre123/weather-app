import request from 'postman-request'

export const getForeCast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1ca03d0a3fc52de0765ccdb076224d4f&query=${latitude},${longitude}&units=f`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect darksky API');
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            const currentWeatherData = body.current;
            callback(undefined, `${currentWeatherData.weather_descriptions[0] ?? "Weather Info not available"}. It is currently ${currentWeatherData.temperature} degrees out. It feels like ${currentWeatherData.feelslike} degrees out. The humidity is ${currentWeatherData.humidity}`)
        }

    })

}