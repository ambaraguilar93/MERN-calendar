
//configuracion basica de express
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//console.log( process.env );

//crear servidor express
const app = express();

//base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use( express.static('public'));

//Lectura y parseo del body
app.use( express.json());

//Rutas
//auth => crear usuario, login, renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
//CRUD => eventos

//escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }` );
});


