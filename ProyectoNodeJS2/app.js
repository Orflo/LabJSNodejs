const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('Hola Mundo!');
});

app.get('/lucas',(req,res)=>{
    res.send('Hola Lucas!');
});

app.listen(3000,() =>{
    console.log('Aplicación escuchando en el puerto 3000');
});