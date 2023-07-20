//para generar id
const nanoid = require('nanoid');
const auth = require('../auth')

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

    async function upsert(body) {
        // creamos un objeto user
        const user = {
            name: body.name,
            username: body.username
        }

        //si nos trae el id anadimos al objeto
        if (body.id) {
            user.id = body.id;
        // si no le damos un id
        } else {
            user.id = nanoid();
        }
        // verificamos si tiene un password y conside con username
        if(body.password||body.username){
            //el password lo guardamos solo en auth.
            await auth.upsert({
                id:user.id,
                username:user.username,
                password:body.password,
            })
        }

        return store.upsert(TABLA, user);
    }

    function follow (from, to) {
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        });
    }

    return {
        list,
        get,
        upsert,
        follow
    };
}