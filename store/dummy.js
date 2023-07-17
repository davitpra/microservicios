const db = {
    'user': [
        { id: '1', name: 'Carlos' },
    ],
}

//nos trae toda la informacion de la tabla
async function list (tabla) {
    return db[tabla];
}


async function get (tabla, id)  {
    //nos trae toda la tabla
    let col = await list(tabla);
    // nos filtra dependiendo el id y devuelve el primero
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert (tabla, data) {
    if(!db[tabla]){
        db[tabla] = []
    }

    db[tabla].push(data);

    console.log(db)
}

async function remove (tabla, id) {
    return true;
}

module.exports= {
    list,
    get,
    upsert,
    remove
}