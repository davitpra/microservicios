const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error')

const secret = config.jwt.secret;

// funcion para firmar un token
function sign(data) {
    // firmamos el token con nuestro secreto.
    return jwt.sign(data, secret);
}



// funcion para checkear el token.
const check = {
    own: function(req, owner) {
        // decodificamos el token
        const decoded = decodeHeader(req)
        console.log(decoded)
        
        if (decoded.id !== owner) {
            throw error('No puedes hacer esto', 401 )
        }
    },
}

// para decodificar el token del header y verificar
function decodeHeader(req) {
    // guardamos la autorizacion del header
    const authorization = req.headers.authorization || '';
    //obtenemos el token de la cabezera
    const token = getToken(authorization);
    //decodificamos el token del
    const decoded = verify(token);
    //guardamos en el request
    req.user = decoded;
    // devolvemos la verificacion true o false
    return decoded;
}

// para obtener el token del header
function getToken(auth) {
    if (!auth) {
        throw error('No viene token', 401 )
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato invalido', 401 )
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

//funcion para verificar si el token es nuestro 
function verify(token) {
    return jwt.verify(token, secret)
}

module.exports = {
    sign,
    check
};