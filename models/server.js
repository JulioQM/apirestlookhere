const express = require('express');
const cors = require('cors');
const { config } = require("../database/config")

class Server {

    constructor() {
        // inicializo express
        this.app = express();

        // puerto la que va correr el aplicativo
        this.port = process.env.PORT;

        // ruta del edpoint
        this.usuarioPath = '/api/lookhere';

        // conectar a base de datos
        this.conectarDB();

        //middleware direccionamiento a pagina estatica
        this.middlewares();

        //llamado a rutas
        this.routes();

    }

    // creo el metodo para llamar mi configuracion de la base de datos
    conectarDB() {
        config
    }

    middlewares() {
        // uso de cors
        this.app.use(cors());
        // lectura(texto) y parsea del body a un archivo json
        this.app.use(express.json());
        // direccionamiento a la página principal
        this.app.use(express.static('public'));
    }

    // Método para atraer el contenido de rutas
    routes() {
        this.app.use(this.usuarioPath, require('../routes/roles.route'));
        this.app.use(this.usuarioPath, require('../routes/usuarios.route'));
        //this.app.use(this.usuarioPath, require('../routes/familiares.route'));
        this.app.use(this.usuarioPath, require('../routes/ciudades.route'));

    }

    // Metodo escuaha para que escuhe el servidor por el puerto 8081
    listen() {
        //this.app.listen(this.port, () => console.log(`escuchando en el puerto ${this.port}`));
        this.app.listen(this.port, () => console.log(`Server running in http://localhost:${this.port}`));

    }
}

module.exports = Server;