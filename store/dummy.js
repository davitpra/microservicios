const db = {
    'user': [
        { id: 1, name: 'Carlos' },
    ],
}

//nos trae toda la informacion de la tabla
function list (tabla) {
    return db[tabla];
}


function get (tabla, id)  {
    //nos trae toda la tabla
    let col = list(tabla);
    // nos filtra dependiendo el id y devuelve el primero
    return col.filter(item => item.id === id)[0] || null;
}

function upsert (tabla, data) {
    db[collection].push(data);
}

function remove (tabla, id) {
    return true;
}

module.exports= {
    list,
    get,
    upsert,
    remove
}