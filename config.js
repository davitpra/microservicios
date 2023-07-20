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
    }
}