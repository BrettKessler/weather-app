const request = require('request');

exports.loadWeather = (req, res, next) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  request(`https://api.darksky.net/forecast/`+ process.env.WEATHER_KEY +`/${latitude},${longitude}?exclude=minutely,hourly,daily,flags`, (error, response, body) => {

    let data = JSON.parse(body);

    if(!response){
      res.status(404).json({
        message: 'Couldn\'t connect to Weather API'
      });
      return;
    }
    res.status(200).json({
      message: 'hello',
      data: data.currently
    })
  })

  // const data = {
  //   test: 'test',
  //   name: 'brett',
  //   help: 'testagain'
  // }

  // res.status(200).json({
  //   data: data
  // })
  // return request('https://api.darksky.net/forecast/8870612915f9a95c187f4b1fe1cee522/37.8267,-122.4233', (err, res, body) => {

  //   let data = JSON.parse(body);
  //   console.log(data);
  //   if(err){
  //     return {
  //       message: 'ERROR getting API'
  //     }
  //   }
  //   return {
  //     message: 'Connected to Weather API',
  //     data: data
  //   }
  // })
}
