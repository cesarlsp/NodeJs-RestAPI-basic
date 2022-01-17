
const { Router } = require('express');
const { 
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
} = require('../controllers/usersController');

const router =  Router();

router.get('/', getUsers);

router.post('/', postUsers);

router.put('/:userId', putUsers);

router.patch('/', patchUsers);

router.delete('/', deleteUsers);

module.exports = router;