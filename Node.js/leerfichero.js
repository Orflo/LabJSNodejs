const fs = require('fs');
console.log('Inicio del programa');
fs.readFile('archivo.txt','utf8',(err,data)=>{
    if(err){
        console.error('Error al leer el archivo',err);
        return;
    }
    console.log('Contenido del archivo',data);
});
console.log('Fin de programa');