
const { Schema, model } = require('mongoose');


const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatorio']
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN','USER']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model( 'User', UserSchema );