const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User =  require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { verifyIdTokenGoogle } = require('../helpers/googleVerify');

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

const googleSignIn = async(request, response) => {

    const { idToken } = request.body;

    try {

        const { name, image, email } = await verifyIdTokenGoogle( idToken );

        let user = await User.findOne({ email });
        
        if ( !user ) {
            // crear usuario
            const dataToSave = {
                name,
                email,
                image,
                password: ':P',
                google: true,
                role: 'USER'
            };

            user = new User ( dataToSave );
            await user.save();
        }

        // si el usuario en BD 
        if ( !user.state ) {
            return response.status(401).json({
                code: 401,
                data: {},
                message: 'Comuniquese con el administrado, el usuario esta bloqueado'
            });
        }

        // generar el JWT
        const token = await generateJWT( user.id );

        return response.json({
            code: 200,
            data: {
                user,
                token
            },
            message: 'todo bien! google'
        });
    } catch (error) {
        return response.status(400).json({
            code: 400,
            data: {},
            message: 'token sin verificar'
        });
    }


}

module.exports = {
    login,
    googleSignIn
}