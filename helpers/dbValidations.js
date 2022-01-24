const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {

    const roleRegistered = await Role.findOne({ role });
    if (!roleRegistered) {
        throw new Error(`El rol ${ role } no esta registrado en base de datos`)
    }

}

const isValidEmail = async (email = '') => {

    const emailRegistered = await User.findOne({ email });
    if ( emailRegistered ) {
        throw new Error(`El correo ${ email } ya esta registrado en base de datos`)
    }
    
}

const existUserById = async ( id ) => {

    const userByIdRegistered = await User.findById( id );
    if ( !userByIdRegistered ) {
        throw new Error(`El usuario con identificador ${ id } no esta registrado en base de datos`)
    }
    
}


module.exports = {
    isValidRole,
    isValidEmail,
    existUserById
}