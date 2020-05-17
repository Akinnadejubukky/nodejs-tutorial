const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');


 

dotenv.config({
    path: path.resolve(__dirname, '../.env')
});


const Config = Object.freeze({
    App: {
        PORT: process.env.PORT,
        BASE_URL: process.env.BASE_URL,
        NAME: process.env.APP_NAME    
    },
    Mongo: {
        URI: process.env.MONGO_URI
    }
});


mongoose.connect(Config.Mongo.URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true    
});


module.exports = Config;