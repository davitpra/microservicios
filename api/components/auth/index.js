// este archivo es para poder cambiar de db facilmente
const store = require('../../../store/mysql');
const ctrl = require('./controller');

// transformamos al controller en una funcion.
module.exports = ctrl(store);