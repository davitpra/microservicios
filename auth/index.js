const jwt = require('jsonwebtoken');
const config = require('../config');

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
            throw new Error('No puedes hacer esto');
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
        throw new Error('No viene token');
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido');
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