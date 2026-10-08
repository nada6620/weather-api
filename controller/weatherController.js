const asyncErrorHandler = require('../utils/asyncErrorHandler')
const getWeatherFromAPI = require('../services/weatherService')

exports.getWeatherData= asyncErrorHandler(async (req,res,next)=>{
    const city = req.params.city ;
    const weatherData = await getWeatherFromAPI(city);

    res.status(200).json({
        Status:'Success',
        data :weatherData
    })
})