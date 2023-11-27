//node NombreDelArchivo.js para poner el servidor en marcha
//crear una constatnte para que llame a la librería del modulo http y fs
const http = require('http');
const fs = require('fs');
//Creamos un log de consola
console.log('Inicio del programa');
//Ejecutamos la función para que saque el contenido de un fichero y lo mande al navegador
fs.readFile('archivo.txt','utf8',(err,data)=>{
    if(err){
        console.error('Error al leer el archivo',err);
        return;
    }
    const server = http.createServer((req,res)=>{
        //codigo del servidor
        //Indicamos en la cabezera del protocolo el tipo de dato que vamos a enviar 
        //Para el html hay que cambiar plain por html
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.write(data);
        //Lo ultimo que va a enviar
        res.end();
    });
    //Definición del puerto para la comunicación
    server.listen(3000,()=>{console.log('Servidor escuchando en el puerto 3000');});
});
console.log('Fin de programa');


