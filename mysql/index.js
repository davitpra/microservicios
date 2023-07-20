const express = require('express');

const config = require('../config');
const router = require('./network');

const app = express();

// para que express utilize json y sus parametros. 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// RUTAS
app.use('/', router)

app.listen(config.mysqlService.port, () => {
    console.log('Servicio de mysql escuchando en el puerto', config.mysqlService.port);
})