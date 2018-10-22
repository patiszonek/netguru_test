var enviroment = process.env.NODE_ENV || 'development';

if(enviroment === 'test' || enviroment === 'development' || enviroment === 'production'){
    var config = require('./config.json');
    var enviromentConfig = config[enviroment];

    Object.keys(enviromentConfig).forEach((key) => {
        process.env[key] = enviromentConfig[key];
    });
}