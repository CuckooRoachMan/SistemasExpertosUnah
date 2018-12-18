//Require

var express  = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();
var session = require("express-session");

var ssn;

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
    var sql = "call sp_Insertarusuarios(?, ?, ?,?)";
      conexion.query(
        sql,
        [request.body.nombre,
        request.body.apellido,

        request.body.email,
        request.body.password],
        function(err, result){
          if (err) throw err;
          response.send(result);
        }
        );
});


//Login
app.post('/login', function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = "call sp_validateLogin(?, ?)";
    conexion.query(sql,
        [ request.body.email, request.body.password],
        function(err, data, fields){
       			    ssn = data[0][0];
                //console.log(data[0][0]);
                if (data[0].length>0){
                    request.session.txt_mail_usuarios = ssn.txt_mail_usuarios;
                    request.session.id_tipo_usuarios = ssn.id_tipo_usuarios;
                    request.session.txt_nombre_usuarios = ssn.txt_nombre_usuarios;
                    request.session.id_usuarios_pk = ssn.id_usuarios_pk;
                    request.session.logged=0;

                    res=data[0][0];

                    console.log("login correcto para id usuario: " + request.session.id_usuarios_pk);

    				        response.send(res);
                }else{
                    response.send({estado:1, mensaje: "login incorrect"});
                }
        }

    );
    });


app.use(express.static("public-usuario"));//Ejecutar middlewares.



//load file root
app.post('/cargar-root', function(request, response){
    //console.log("session " + request.session.idusuario)
    var conexion = mysql.createConnection(credenciales);
    var sql = `
    select txt_nombre_carpetas, id_carpetas_pk from carpetas
    inner join Usuarios
    where id_usuarios_pk = id_usuarios_fk
    and id_usuarios_pk = ${request.session.id_usuarios_pk};
    `;
    conexion.query(sql,
    [],
        function(err, data, fields){
                console.log(data);
                carpeta=data;
                if (data.length>0){
                    request.session.id_carpetas_pk=carpeta.id_carpetas_pk;
                    res=data;
    				        response.send(res);
                }else{
                    response.send({estado:1, mensaje: "Algo paso"});
                }
        }

    );
    });


//load subfolders

app.post('/obtener-subcarpetas', function(request, response){
    //console.log("session " + request.session.idusuario)
    var conexion = mysql.createConnection(credenciales);
    var sql = `

    select txt_nombre_subcarpetas , id_subcarpetas_pk from subcarpetas
    inner join carpetas
    where id_carpetas_pk = id_carpetas_fk
    and id_carpetas_pk = ?;

    `;
    conexion.query(sql,
    [request.body.parentFolder],
        function(err, data, fields){
                console.log(data);
                if (data.length>0){
                    res=data;
    				        response.send(res);
                }else{
                    response.send({estado:1, mensaje: "Algo paso"});
                }
        }

    );
    });

//


// load files

app.post('/obtener-archivos', function(request, response){
    //console.log("session " + request.session.idusuario)
    var conexion = mysql.createConnection(credenciales);
    var sql = `

    select txt_nombre_archivos , id_archivos_pk from archivos
    inner join subcarpetas
    where id_subcarpetas_pk = id_subcarpetas_fk
    and id_subcarpetas_pk = ?;

    `;
    conexion.query(sql,
    [request.body.parentFolder],
        function(err, data, fields){
                console.log(data);
                if (data.length>0){
                    res=data;
    				        response.send(res);
                }else{
                    response.send({estado:1, mensaje: "Algo paso"});
                }
        }

    );
    });


/// crear carpeta
app.post('/crear-carpeta', function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = "sp_insertarCarpetas(?, ?)";
      conexion.query(
        sql,
        [request.body.nombre,
        request.body.id],
        function(err, result){
          if (err) throw err;
          response.send(result);
        }
        );
});

// crear  sub carpeta

app.post('/crear-subcarpeta', function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = "sp_insertarsubCarpetas(?, ?)";
      conexion.query(
        sql,
        [request.body.nombre,
        request.body.id],
        function(err, result){
          if (err) throw err;
          response.send(result);
        }
        );
});

//crear archivos

app.post('/crear-archivo', function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = "sp_insertarArchivos(?, ?, ?)";
      conexion.query(
        sql,
        [request.body.nombre,
        request.body.id,
        request.body.contenido
        ],

        function(err, result){
          if (err) throw err;
          response.send(result);
        }
        );
});

// editar archivo

app.post('/editar-archivo', function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = "sp_updateArchivos(?, ?)";
      conexion.query(
        sql,
        [
        request.body.id,
        request.body.contenido
        ],

        function(err, result){
          if (err) throw err;
          response.send(result);
        }
        );
});

/// borrar archivo


/// editar perfil

/// agregar a compartidos  // compartir

/// cambiar plan







app.listen(8111, function(){ console.log("Servidor iniciado");});
