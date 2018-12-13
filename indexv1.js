//Require

var express  = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();
var session = require("express-session");

//use
//session (not used yet)
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));
//



app.use(express.static("public"));//Ejecutar middlewares.
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//credenciales
var credenciales = {
    user: "root",
    password:"akatsuki9",
    database:"bwami",
    host:"localhost",
    port:"3306"
};






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















//registrar usuario nuevo
app.post('/registrar-usuarios', function(request, response){
    var conexion = mysql.createConnection(credenciales);
        sql = "call call sp_Insertarusuarios('jamz', 'Martinez', 1993-05-05, 'my@mail.com','#78Margarita');";
        conexion.query(sql,
            function(err, data, fields){
                var datos = data[0];
                if (data.length>0){
                    console.log(datos);
                    response.send(datos);
                }else{
                    response.send({estado:1, mensaje: "No se pudo cargar el datos"});
                }
            }
            );
    });







app.listen(8111);
