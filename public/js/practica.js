var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static("public"));//Ejecutar middlewares.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/procesar",function(req,res){ //req: Peticion, res: Respuesta

    //req.query es un JSON con los valores enviados mediante GET
    //req.body es un JSON con los valores enviados mediante POST, es necesario instalar el modulo body-parser
    res.send("Información recibida" + JSON.stringify(req.body));
    res.end();
});

app.get("/mensaje/:texto1/:texto2",function(req,res){
    res.send("Texto1: " + req.params.texto1 + ", texto2: " + req.params.texto2);
    res.end();
});

app.get("/ab*cd", function(req,res){
    res.send("Si cumple con el patron ab*cd");
});

app.listen(8111);
