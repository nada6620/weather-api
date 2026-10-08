const axios = require('axios');
const appError = require('../utils/appError');
const redisClient = require('../utils/redis');
const { json } = require('express');

const getWeatherFromAPI  = async (city)=>{
    try{
        // 1. check redis cache
        const cacheData = await redisClient.get(city)
        if(cacheData){
            return JSON.parse(cacheData);
        }

        // 2. if data not in cache , call Visual Crossing API
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&key=${apiKey}&contentType=json`;

     const response = await axios.get(url);
     const data = response.data;

     // 3. Prepare the weather data
    const weatherData = {
            city: data.resolvedAddress,
            temperature: data.currentConditions.temp,
            humidity: data.currentConditions.humidity,
            conditions: data.currentConditions.conditions,
            windSpeed: data.currentConditions.windspeed
     }

     // 4. Save data in Redis for 12 hours

     await redisClient.set(
        city,
        JSON.stringify(weatherData),
        {
            Ex : 43200
        }
     )
     return weatherData;

    }catch(err){
        console.log('REAL ERROR:', err);
        if (err.response?.status === 404) {
            throw new appError('City not found', 404);
        }

        throw new appError('Weather service is currently unavailable', 503);
    }
    
}

module.exports=getWeatherFromAPI;