var http = require('http');
//formidable --> recoge de un formulario web
var formidable = require('formidable');
//fs --> file system
var fs = require('fs');
//mv --> se usa para mover ficheros
var mv = require('mv');

http.createServer(function(req,res){
    //codigo que vamos a crear
    if(req.url == '/fileupload'){
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files){

            var oldpath = files.filetoupload[0].filepath;
            var newpath = './ProyectoNodeJS' + files.filetoupload.originalFilename;

            mv(oldpath, newpath, function (err){
                if(err){
                    throw err;
                }else{
                    res.write('File uploaded and moved!');
                    res.end();
                }
            });
        });
    }else{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write("<h1>Prueba IAW</h1>");
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);