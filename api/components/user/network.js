const express = require('express');

const secure = require('./secure')
const response = require('../../../network/response');
const controller = require('./index')

const router = express.Router();

//ROUTES
router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', secure('update') , upsert)

//INTERNAL FUNCTIONS
function list (req, res, next) {
    controller.list()
        .then((lista)=> {
            response.success(req, res, lista, 200)
        })
        // los errores se gestionan en el middleware de error
        .catch(next)
}

function get (req, res, next) {
    controller.get(req.params.id)
    .then((user)=> {
        response.success(req, res, user, 200)
    })
    // los errores se gestionan en el middleware de error
    .catch(next)
}


function upsert (req, res, next) {
    controller.upsert(req.body)
    .then((user)=> {
        response.success(req, res, user, 201)
    })
    // los errores se gestionan en el middleware de error
    .catch(next)
}

module.exports = router