/**
 *  Rutas de Usuarios / Auth
 *  host + /api/auth
 **/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/field-validators');
const { JWTValidation } = require('../middlewares/jwt-validators');

const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

router.post(
    '/new', 
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres').isLength({min: 6}),
        fieldValidation
    ],
    crearUsuario
    );

router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres').isLength({min: 6}),
        fieldValidation
    ],
    loginUsuario
    );

router.get('/renew', JWTValidation, revalidarToken);

module.exports = router;