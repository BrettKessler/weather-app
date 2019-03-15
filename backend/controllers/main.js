const request = require('request');

exports.getLocation = (req, res, next) => {
  console.log('hello')
  const lat = req.query.latitude;
  const long = req.query.longitude;
  console.log(lat, long)
  request(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=`+ process.env.LOCATION_KEY+``, (error, response, body) => {
    let data = JSON.parse(body);
    location = data.results[0].components;
    if(!response){
      res.send(404).json({
        message: 'Geolocation is down'
      })
    }
    res.status(200).json({
      message: 'Location data',
      location: location
    })
  });
};

exports.loadWeather = (req, res, next) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  request(`https://api.darksky.net/forecast/`+ process.env.WEATHER_KEY +`/${latitude},${longitude}?exclude=minutely,hourly,flags`, (error, response, body) => {

    let data = JSON.parse(body);
    if(!response){
      res.status(404).json({
        message: 'Couldn\'t connect to Weather API'
      });
      return;
    }
    res.status(200).json({
      message: 'hello',
      data: data.currently,
      weekData: data.daily
    })
  })
}
