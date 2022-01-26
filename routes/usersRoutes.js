
const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validateFields,
    validateJWT,
    isRole 
} = require('../middlewares');

const { 
    isValidRole,
    isValidEmail,
    existUserById 
} = require('../helpers/dbValidations');

const { 
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
} = require('../controllers/usersController');

const router =  Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( isValidEmail ),
    check('password', 'La contraseña debe contener al menos 6 caracteres').isLength({ min:6 }),
    // check('role', 'No es un rol permitido').isIn(['ADMIN', 'USER']),
    check('role').custom( isValidRole ),
    validateFields
], postUsers);

router.put('/:userId', [
    check('userId', 'No es un identificador válido').isMongoId(),
    check('userId').custom( existUserById ),
    check('role').custom( isValidRole ),
    validateFields
], putUsers);

router.patch('/', patchUsers);

router.delete('/:userId', [
    validateJWT,
    // isAdminRole,
    isRole('ADMIN','VENTAS'),
    check('userId', 'No es un identificador válido').isMongoId(),
    check('userId').custom( existUserById ),
    validateFields
], deleteUsers);

module.exports = router;