const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

// funcion para conectarse con la base de datos
function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

// funcion para obtener la tabla de la db
function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

// funcion para obtener la un objeto  de la db
function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

// funcion para anadir a la db
// function insert(table, data) {
//     return new Promise((resolve, reject) => {
//         connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//         })
//     })
// }

// funcion para modificar a la db
// function update(table, data) {
//     return new Promise((resolve, reject) => {
//         connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//         })
//     })
// }

// funcion para modificar a la db
const upsert = async (table, payload) => new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [payload, payload], (error, data) => {
      console.log('UPDATE DATA: ', data)
      if (error) {
        return reject(error)
      }
      resolve(data)
    })
  })

// funcion para buscar en la db
function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query
};