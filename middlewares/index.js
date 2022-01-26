
const validatorFields = require('../middlewares/validateFields');
const validatorJWT = require('../middlewares/validateJwt');
const validatorRoles = require('../middlewares/validateRoles');

module.exports = {
    ...validatorFields,
    ...validatorJWT,
    ...validatorRoles
}