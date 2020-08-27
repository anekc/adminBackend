const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
// crear el servidor de express
const app = express();
//password
// I65eydx1IbqShgm5

//configurar cors
app.use(cors());


//Base de datos
dbConnection();

console.log(process.env);
// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msj: 'hola mundo'
    });
});




app.listen(process.env.PORT, () => {
    console.log('servidor corriendo el puerto ' + process.env.PORT);
});