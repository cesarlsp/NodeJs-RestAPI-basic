
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // Conexión a base de datos
        this.mongoDbConnection();
        
        // Middlewares
        this.middlewares();
        
        // Rutas de la aplicación REST
        this.routes();
    }

    async mongoDbConnection(){
        await dbConnection();
    }
    
    middlewares(){
        
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use( express.json() );
        
        // Directorio público
        this.app.use( express.static('public') );
    }

    routes (){

        this.app.use(this.authPath, require('../routes/authRoutes'));
        this.app.use(this.usersPath, require('../routes/usersRoutes'));

    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo por el puerto ${ this.port }`);
        });

    }
}

module.exports = Server;