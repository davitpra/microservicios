const express = require('express')

//libreria para crear la documunetacion 
const swaggerUi = require('swagger-ui-express')

const config = require('../config.js')
const user = require('./components/user/network')
const auth = require('./components/auth/network')

const app = express()

// para que express utilize json y sus parametros. 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//documentacion 
const swaggerDoc = require('./swagger.json')

//Router
app.use('/api/user', user)
app.use('/api/auth', auth)
// ruta para ver la documentacion con swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.listen(config.api.port, ()=>{
    console.log('Api escuchando en el puerto', config.api.port)
})