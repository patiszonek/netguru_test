var enviroment = process.env.NODE_ENV || 'production';

if(enviroment === 'test' || enviroment === 'production'){
    var config = require('./config.json');
    var enviromentConfig = config[enviroment];

    Object.keys(enviromentConfig).forEach((key) => {
        process.env[key] = enviromentConfig[key];
    });
}