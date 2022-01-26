const { response, request } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getUsers = async(request, response) => {

    const { offset = 0, limit = 5 } =  request.query;
    const query = { state: true };

    const [ total, users] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number( offset ) )
            .limit( Number( limit ) )
    ]);

    response.json({
        code: 200,
        data: { 
            total,
            users
        },
        message: 'Get users controller'
    });
}

const postUsers = async(request, response) => {

    const { name, email, password, role } = request.body;
    const user = new User( { name, email, password, role } );

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    
    // guardar en base de datos
    await user.save();

    response.json({
        code: 200,
        data: {
            user
        },
        message: 'Post users controller'
    });
}

const putUsers = async(request, response) => {

    const { userId } = request.params;
    const { _id, password, google, email, ...otherData } = request.body;

    // validar contra base de datos
    if ( password ) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        otherData.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( userId, otherData );

    response.json({
        code: 200,
        data: {
            user
        },
        message: 'Put users controller'
    });
}

const patchUsers = (request, response) => {
    response.json({
        code: 200,
        data: {},
        message: 'Patch users controller'
    });
}

const deleteUsers = async(request, response) => {

    const { userId } = request.params;

    // const authenticatedUser = request.authenticatedUser;

    // const user = await User.findByIdAndDelete( userId ); // ########## Borrado fisicamente ############
    // Borrado logico
    const user = await User.findByIdAndUpdate( userId, { state: false } );
    user.state = false;

    response.json({
        code: 200,
        data: {
            user
            // authenticatedUser
        },
        message: 'Delete users controller'
    });
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}