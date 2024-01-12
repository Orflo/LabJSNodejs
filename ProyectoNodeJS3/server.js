var express = require ("express");
var bodyParser = require ("body-parser");
var path = require ("path");
var fs = require ("fs");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/formulario', function(req,res){
    var nombre = req.body.nombre
    var passwd = req.body.passwd
    console.log(nombre);
    console.log(passwd);
    if(nombre === "Lucas" && passwd === "andel1928"){
        res.sendFile(path.join(__dirname + '/userinterface.html'));
    } else {
        res.sendFile(path.join(__dirname + '/error.html'));
    }
});

app.listen(3000, function(){
    console.log("Escuchando en el puerto 3000");
});


  
