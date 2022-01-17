const { response, request } = require('express');

const getUsers = (request, response) => {

    // const params =  request.query;
    const { search, order } =  request.query;

    response.json({
        code: 200,
        data: [
            search,
            order
        ],
        message: 'Get users controller'
    });
}

const postUsers = (request, res) => {

    const { nombre, edad } = request.body;

    res.json({
        code: 200,
        data: [
            nombre,
            edad
        ],
        message: 'Post users controller'
    });
}

const putUsers = (request, res) => {

    const { userId } = request.params;
    const { nombre, edad } = request.body;

    res.json({
        code: 200,
        data: [
            userId,
            nombre,
            edad
        ],
        message: 'Put users controller'
    });
}

const patchUsers = (request, res) => {
    res.json({
        code: 200,
        data: [],
        message: 'Patch users controller'
    });
}

const deleteUsers = (request, res) => {
    res.json({
        code: 200,
        data: [],
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