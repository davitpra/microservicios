const TABLA = 'auth';

// exportamos como si fuera una funcion que le inyectan el store. 
module.exports = function (injectedStore) {
    let store = injectedStore;
    
    // si no hay store
    if (!store) {
        store = require('../../../store/dummy')
    }

    //para hacer registro del usuario
    function upsert(data){
        // creamos un id con el ide del usuario
        const authData={ 
           id:data.id,
        }

        //agregamos el username del usuario
        if(data.username){
            authData.username=data.username;
        }
        //agregamos el password del usuario
        if(data.password){
            authData.password=data.password
        }
        
        return store.upsert(TABLA,authData)
    }

    return{
        upsert
    }
}