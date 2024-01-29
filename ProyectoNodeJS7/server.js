const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const puerto = 3000;

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datos'
});

// Ruta para servir la página HTML al acceder a la raíz
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

// Configuración para procesar datos en las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para ejecutar el script de PowerShell
app.post('/ejecutar-script', (req, res) => {
    const scriptFileName = 'procesos.ps1';
    const scriptPath = path.join(__dirname, scriptFileName);
    exec(`powershell.exe -File ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de PowerShell: ${error.message}`);
            // Enviar una respuesta con un script JavaScript para mostrar un mensaje de error en el cliente
            res.send('<script>alert("Error interno del servidor"); window.location="/";</script>');
            return;
        }
        // Enviar una respuesta con un script JavaScript para mostrar un mensaje de éxito en el cliente
        res.send('<script>alert("Script de PowerShell ejecutado correctamente"); window.location="/";</script>');
    });
});

// Ruta para recibir datos y almacenarlos en la base de datos
app.post('/receptor', (req, res) => {
    if (Array.isArray(req.body)) {
        req.body.forEach((parametro) => {
            console.log('Parámetros recibidos:', parametro.nombre, parametro.CPU);
            const { nombre, CPU } = parametro;
            const sql = 'INSERT INTO processinfo (nombre, CPU) VALUES (?, ?)';
            const values = [nombre, CPU];
            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Error al insertar datos en la base de datos: ', err);
                }
                console.log('Datos insertados correctamente');
            });
        });
        res.send('Información recibida y almacenada correctamente.');
    } else {
        res.status(400).send('El cuerpo de la solicitud no es un array.');
    }
});

// Ruta para obtener datos de la base de datos
app.get('/obtener-datos', (req, res) => {
    const sql = 'SELECT * FROM processinfo';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al obtener datos de la base de datos: ', err);
            return res.status(500).send('Error al obtener datos de la base de datos');
        }
        console.log('Datos de la base de datos obtenidos correctamente');
        res.json(result);
    });
});

// Iniciar el servidor
app.listen(puerto, () => {
    console.log(`Servidor Node.js escuchando en el puerto ${puerto}`);
});
