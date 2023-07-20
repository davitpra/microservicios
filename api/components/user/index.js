// este archivo es para poder cambiar de db facilmente
const config = require ('../../../config')

let store

if( config.remoteDB == true) {
    store = require('../../../store/remote-mysql');
} else {
    store = require('../../../store/mysql');

}

const ctrl = require('./controller');

// transformamos al controller en una funcion.
module.exports = ctrl(store);