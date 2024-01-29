import express from 'express'
import {pool} from './db.js'
import {PORT} from '../VC/config.js'

// la creación de la aplicación web en Nodejs con express
const app = express();

// el puerto de nuestra aplicacion web por defecto va a ser el 3000
app.listen (PORT);
console.log ('Server on port', PORT);

app.get ('/', async (req, res) => {
    //res.send ("Implantación aplicaciones web5")
    try{
        const [result] = await pool.query (`SELECT * from users`)
        res.json (result)
    }catch (error){
        console.log (error)
    }
});

app.get ('/ping', async(req, res) => {
    try{
        const [result] = await pool.query (`SELECT "hello world" AS RESULT`)
        res.send (result[0])
    }catch (error){
        console.log (error)
    }
});

app.get ('/create', async(req, res) => {
    
    try{
        const result = await pool.query (`insert into users(name) values ("John")`)
    console.log (result)
}catch (error){
    console.log ("error")
}

});