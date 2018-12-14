//Require

var express  = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();
var session = require("express-session");

//use
//session (not used yet)
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//express
app.use(express.static("public"));//Ejecutar middlewares.
//credenciales
var credenciales = {
    user: "root",
    password:"akatsuki9",
    host:"localhost",
    port:"3306",
    database:"bwami",
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});






//registrar usuario nuevo
app.post('/registrar-usuarios', function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = "call sp_Insertarusuarios(?, ?, ?, ?,?)";
      conexion.query(
        sql,
        [request.body.nombre,
        request.body.apellido,
        request.body.dob,
        request.body.email,
        request.body.password],
        function(err, result){
          if (err) throw err;
          response.send(result);
        }
        );
});



app.listen(8111, function(){ console.log("Servidor iniciado");});
