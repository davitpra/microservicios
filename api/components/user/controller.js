const TABLA = 'user';

// exportamos como si fuera una funcion que le inyectan el store. 
module.exports = function (injectedStore) {
    let store = injectedStore;
    
    // si no hay store
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    return {
        list,
        get
    };
}