const app = require('./app');
const redisClient = require('./utils/redis');
const port = 3000;

const startServer = async () =>{
    await redisClient.connect();
     console.log('Redis connected successfully');

     app.listen(port , ()=>{
    console.log(`App running on port ${port}`);
})

}

startServer();


