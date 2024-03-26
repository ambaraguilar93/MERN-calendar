//CRUD

/**
 *  Rutas de Usuarios / Events
 *  host + /api/events
 **/


const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidation } = require('../middlewares/field-validators');
const { JWTValidation } = require('../middlewares/jwt-validators');

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const { isDate } = require('../helpers/isDate');


const router = Router();

//Todas pasan por validacion de jwt
router.use( JWTValidation );

//obtener eventos
router.get('/', getEventos);

//crear eventos
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha Inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha Fin es obligatoria').custom( isDate ),
        fieldValidation

    ],
    crearEvento
);

//actualizar eventos
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha Inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha Fin es obligatoria').custom( isDate ),
        fieldValidation

    ],
    actualizarEvento);

//borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;