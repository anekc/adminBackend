// inicio de una app express
const express = require('express');
// install ddotenv para las variables de entorno y
// crear archivo .env
require('dotenv').config();
const cors = require('cors');
// connexiona a la base de datos
const { dbConnection } = require('./database/config');
// crear el servidor de express
const app = express();
//password
// I65eydx1IbqShgm5

//configurar cors
app.use(cors());

// lectura y parseo del body

app.use(express.json());


//Base de datos iniciarla
dbConnection();
// DIRECTORIO PUBLICO
app.use(express.static('public'));

console.log(process.env);
// Rutas

app.use('/api/usuarios', require('./routes/usuariosRoutes'));
app.use('/api/hospitales', require('./routes/hospitalesRoutes'));
app.use('/api/medicos', require('./routes/medicosRoutes'));
app.use('/api/todo', require('./routes/busqueda'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));





app.listen(process.env.PORT, () => {
    console.log('servidor corriendo el puerto ' + process.env.PORT);
});