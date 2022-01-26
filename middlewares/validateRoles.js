
const isAdminRole = ( request, response, next ) => {

    if ( !request.authenticatedUser ) {

        return response.status(500).json({
            code: 500,
            data: {},
            message: 'Se esta verificando rol sin verificar token'
        });
    }

    const { name, role } = request.authenticatedUser;

    if (role !== 'ADMIN') {
        return response.status(401).json({
            code: 401,
            data: {},
            message: `El usuario ${ name }, no tiene permisos suficientes`
        });
    }

    next();
}

const isRole = ( ...roles ) => {
    return ( request, response, next ) => {

        if ( !request.authenticatedUser ) {

            return response.status(500).json({
                code: 500,
                data: {},
                message: 'Se esta verificando rol sin verificar token'
            });
        }

        if( !roles.includes( request.authenticatedUser.role ) ){

            return response.status(401).json({
                code: 401,
                data: {},
                message: `El usuario ${ request.authenticatedUser.name }, no tiene ninguno de estos roles (${ roles })`
            });

        }

        next();
    }
}

module.exports = {
    isAdminRole,
    isRole
}