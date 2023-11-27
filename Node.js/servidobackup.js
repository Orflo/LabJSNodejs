//node NombreDelArchivo.js para poner el servidor en marcha
//crear una constatnte para que llame a la librería del modulo http
const http = require('http');
// crear la constante del servidor
const server = http.createServer((req,res)=>{
    //codigo del servidor
    //Indicamos en la cabezera del protocolo el tipo de dato que vamos a enviar 
    //Para el html hay que cambiar plain por html
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<html><head><title>Mi Primer Servidor</title></head><body><h1>Hola desde mi servidor Node.js</h1></body></html>');
    res.end();
    //Lo ultimo que va a enviar
    //res.end('Hola desde Node.js');
});
//Definición del puerto para la comunicación
server.listen(3000,()=>{console.log('Servidor escuchando en el puerto 3000');});
