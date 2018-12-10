var express = require("express");
var bodyparser = require("body-parser");

var app = express();

app.use(express.static("public"));//Ejecutar middlewares.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

pp.post("/procesar",function(req,res){ //req: Peticion, res: Respuesta

    //req.query es un JSON con los valores enviados mediante GET
    //req.body es un JSON con los valores enviados mediante POST, es necesario instalar el modulo body-parser
    res.send("Información recibida" + JSON.stringify(req.body));
    res.end();
});

app.get("/landing.html",function(req,res){
    res.send("<html><body><h1>Hola mundo</h1></body></html>");
    res.end();
});



app.listen(8111);
