const fetch = require('node-fetch');

function createRemoteDB(host, port) {
    const URL = 'http://'+ host + ':' + port;

    async function list(table) {
        try {
            const response = await fetch(`${URL}/${table}`);
            const data = await response.json();
            return data;
        } catch (err){
            console.error('Error con la base de datos remota', err);
        }
    }

    return {
        list,
    }
}

    // function get(table, id)
    // function upsert(table, data)
    // function query(table, query, join)



module.exports = createRemoteDB;