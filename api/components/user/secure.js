const auth = require('../../../auth');

// middleware para checkear si es usuario es validado.
module.exports = function checkAuth(action) {

    function middleware(req, res, next) {
        // dependiendo la accion que queramos validar
        switch(action) {
            case 'update':
                const owner = req.body.id;
                // aqui comprobamos que el usuario sea el mismo
                auth.check.own(req, owner);
                next()
                break;

            case 'follow':
                // aqui comprobamos que tenga el token
                auth.check.logged(req);
                next()
                break;

            default:
                next();
        }
    }

    return middleware;
}