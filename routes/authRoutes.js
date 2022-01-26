const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validateFields
} = require('../middlewares');

const { login } = require('../controllers/authController');

const router =  Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validateFields
], login);

module.exports = router;