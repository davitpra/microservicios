const dotenv = require('dotenv').config();

module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'secreto'
    },
    mysql:{
        host: process.env.MYSQL_HOST|| '',
        user: process.env.MYSQL_USER|| '',
        password: process.env.MYSQL_PASSWORD|| '',
        database: process.env.MYSQL_DATABASE|| '',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    },
    cacheService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3003,
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis-13556.c14.us-east-1-3.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || 13556,
        password: process.env.REDIS_PASS || '9sWIItAvlPbkoTcwOXstNm9hDFv7AU2F',
    }
}