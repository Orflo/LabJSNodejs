const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'formulario'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/formulario.html'));
    //__dirname : It will resolve to your project folder.
});

// Middleware para procesar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para manejar la inserción de datos desde el formulario
app.post('/insertardatos', (req, res) => {
    const { nombre, apellido, telefono, email } = req.body;

    const sql = 'INSERT INTO ficha (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)';
    const values = [nombre, apellido, telefono, email];

    // Ejecutar la consulta SQL
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar datos en la base de datos: ', err);
            // Mostrar alerta en el navegador
            res.send('<script>alert("Error interno del servidor"); window.location="/";</script>');
            return;
        }
        // Mostrar alerta en el navegador
        res.send('<script>alert("Datos insertados correctamente"); window.location="/";</script>');
    });
});

// Ver la información de la BBDD
app.get('/verficha' , (req, res) => {
    db.query('SELECT * FROM ficha', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.error(err);
            // Mostrar alerta en el navegador
            res.send('<script>alert("Error interno del servidor"); window.location="/";</script>');
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en ${port}`);
});
