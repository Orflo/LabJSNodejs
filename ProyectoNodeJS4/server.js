const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Variables para almacenar la información
let users = [];
let comments = [];
let currentUsername = "";  // Variable global para almacenar el nombre de usuario actual

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    users.push(username);
    currentUsername = username;  // Almacenar el nombre de usuario actual
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/write-comment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'escribir.html'));
});

app.post('/add-comment', (req, res) => {
    const comment = req.body.comment;
    comments.push({ username: currentUsername, comment: comment });  // Almacenar el comentario junto con el nombre de usuario
    res.redirect('/home');
});

// Endpoint para obtener el nombre de usuario actual
app.get('/get-username', (req, res) => {
    res.json({ username: currentUsername });
});

// Endpoint para obtener todos los comentarios
app.get('/get-comments', (req, res) => {
    res.json({ comments: comments });
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});

