const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(request, response, next) => {
    
    const token = request.header(`X-AUTH-${ process.env.PROJECT_SHORT }-TOKEN`);
    if( !token ){
        return response.status(401).json({
            code: 401,
            data: {},
            message: 'Token requerido'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );

        const authenticatedUser = await User.findById( uid );

        // verificación de existencia de usuario
        if ( !authenticatedUser ) {
            return response.status(401).json({
                code: 401,
                data: {},
                message: 'Token invalido'
            });
        }

        // verificación del usuario activo
        if ( !authenticatedUser.state ) {
            return response.status(401).json({
                code: 401,
                data: {},
                message: 'Token invalido'
            });
        }
        
        request.authenticatedUser = authenticatedUser;
        next();

    } catch (error) {
        console.log(error);
        
        return response.status(401).json({
            code: 401,
            data: {},
            message: 'Token invalido'
        });
    }

}

module.exports = {
    validateJWT
}