const bcrypt = require('bcrypt')
const auth = require('../../../auth')

const TABLA = 'auth';

// exportamos como si fuera una funcion que le inyectan el store. 
module.exports = function (injectedStore) {
    let store = injectedStore;
    
    // si no hay store
    if (!store) {
        store = require('../../../store/dummy')
    }

    // para el login
    async function login(username,password){
        // definimos la data filtrando por el username 
        const data=await store.query(TABLA, { username })

        // comparamos que sea el mismo password con bcrypt
        if (bcrypt.compare(password, data.password)) {
            // devolvemos el token firmado
            return auth.sign(data)
        } else {
            throw new Error('Informacion invalida')
        }
    } 
    //para hacer registro del usuario
    async function upsert(data){
        // creamos un id con el ide del usuario
        const authData={ 
           id:data.id,
        }

        //agregamos el username del usuario
        if(data.username){
            authData.username=data.username;
        }
        //agregamos el password del usuario hasheado
        if(data.password){
            authData.password= await bcrypt.hash(data.password, 5)
        }
        
        return store.upsert(TABLA,authData)
    }

    return{
        upsert,
        login
    }
}