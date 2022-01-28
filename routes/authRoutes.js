const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validateFields
} = require('../middlewares');

const { login, googleSignIn } = require('../controllers/authController');

const router =  Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validateFields
], login);

router.post('/google', [
    check('idToken', 'El id token es necesario').notEmpty(),
    validateFields
], googleSignIn);

module.exports = router;