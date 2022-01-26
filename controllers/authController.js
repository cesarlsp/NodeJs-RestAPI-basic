const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User =  require('../models/user');
const { generateJWT } = require('../helpers/JWT');

const login = async(request, response) => {

    const { email, password } = request.body;

    try {

        // Verificar si el correo existe
        const user = await User.findOne({ email });

        if( !user ) {
            return response.status(400).json({
                code: 400,
                data: {},
                message: 'correo / password incorrectos - correo'
            });
        }

        // Verificar el usuario activo
        if( !user.state ) {
            return response.status(400).json({
                code: 400,
                data: {},
                message: 'usuario inactivo'
            });
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );

        if ( !validPassword ) {
            return response.status(400).json({
                code: 400,
                data: {},
                message: 'correo / password incorrectos - password'
            });
        }

        // Generar el JWT
        const token = await generateJWT( user.id );
        
        response.json({
            code: 200,
            data: {
                user,
                token
            },
            message: 'login exitoso'
        });

    } catch (error) {
        response.status(500).json({
            code: 500,
            data: {
                error
            },
            message: 'login fallido'
        });
    }
}

module.exports = {
    login
}