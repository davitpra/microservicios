const jwt = require('jsonwebtoken');

function sign(data) {
    // firmamos el token con nuestro secreto.
    return jwt.sign(data, 'secreto');
}

module.exports = {
    sign,
};