Drop database bwami;

create database bwami;

use bwami;

SHOW TABLES;

CREATE TABLE Usuarios (
id_usuarios_pk int primary key auto_increment,
txt_nombre_usuarios varchar(50),
txt_apellido_usuarios varchar(50),
#date_fechanacimiento_usuarios date,
date_creacion_usuarios timestamp default current_timestamp,
txt_correo_usuarios varchar(255) DEFAULT NULL,
txt_password_usuarios varchar(255) DEFAULT NULL,
id_tipo_usuarios int DEFAULT 1 NOT NULL,
id_plantype_usuarios int DEFAULT 1 NOT NULL
); 


CREATE TABLE carpetas (
id_carpetas_pk int primary key auto_increment,
txt_nombre_carpetas varchar(50),
date_creacion_carpetas timestamp default current_timestamp,
date_update_carpetas timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
id_usuarios_fk int
); 


CREATE TABLE subcarpetas (
id_subcarpetas_pk int primary key auto_increment,
txt_nombre_subcarpetas varchar(50),
date_creacion_subcarpetas timestamp default current_timestamp,
date_update_subcarpetas timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
id_carpetas_fk int 
);

CREATE TABLE capetascompartidasxsubcarpetas (
id_carpetascompartidas_fk int,
id_subcarpetas_fk int
);

CREATE TABLE carpetascompartidas (
id_carpetascompartidas_pk int primary key auto_increment,
txt_nombre_carpetascompartidas varchar(50),
date_creacion_carpetascompartidas timestamp default current_timestamp,
date_update_carpetascompartidas timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
txt_nombreusuario_carpetascompartidas varchar(50),
id_subcarpetas_fk int 
);

CREATE TABLE archivos (
id_archivos_pk int primary key auto_increment,
txt_nombre_archivos varchar(50),
date_archivos_subcarpetas timestamp default current_timestamp,
date_update_archivos timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
id_subcarpetas_fk int,

txt_contenido_archivos longtext

);




DELIMITER //

CREATE PROCEDURE sp_Insertarusuarios( IN nombre varchar(50), IN apellido varchar(50),  IN correo varchar(255), IN pass varchar(255))
BEGIN 
#Podemos usar un select anterior como ejemplo
INSERT INTO Usuarios(
txt_nombre_usuarios,
txt_apellido_usuarios,

txt_correo_usuarios,
txt_password_usuarios
)
values (nombre, apellido,  correo,  md5(pass));

set @id = (select id_usuarios_pk from Usuarios where md5(pass)=txt_password_usuarios and current_timestamp= date_creacion_usuarios); 


Insert into carpetas(
txt_nombre_carpetas,
id_usuarios_fk 
)
values 
('Proyectos',@id),
('Compartidos',@id),
('Snippets',@id),
('Misc',@id)
;

set @idcarpeta = (select id_carpetas_pk from carpetas join Usuarios  where id_usuarios_pk = id_usuarios_fk  and txt_nombre_carpetas='Proyectos' order by id_usuarios_pk desc limit 1); 

Insert into subcarpetas(
txt_nombre_subcarpetas,
id_carpetas_fk 
)
values 
('Mi primer Proyecto',@idcarpeta);

set @idsubcarpeta = (
select id_subcarpetas_pk from subcarpetas join carpetas  where id_carpetas_pk = id_carpetas_fk order by id_subcarpetas_pk desc limit 1 );

Insert into archivos(
txt_nombre_archivos,
id_subcarpetas_fk,
txt_contenido_archivos 
)
values 
('Ejemplo.html',@idsubcarpeta, 
'
 <!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html> 
'
),
('Ejemplo.js',@idsubcarpeta, 
'
//primer programa
console.log("hola mundo");
'
),

('Ejemplo.html',@idsubcarpeta, 
'
 body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}

p {
  font-family: verdana;
  font-size: 20px;
}
'
);
#No hay necesidad de regresar algo, eso se hace en los paramentos despues de OUT
END;//

CREATE PROCEDURE sp_validateLogin( IN mail varchar(50), IN pass varchar(255))
BEGIN 
#Podemos usar un select anterior como ejemplo

SELECT id_usuarios_pk, id_tipo_usuarios, id_plantype_usuarios, txt_nombre_usuarios, txt_correo_usuarios 
FROM Usuarios 
where (mail = txt_correo_usuarios AND  md5(pass) = txt_password_usuarios);  

 
#No hay necesidad de regresar algo, eso se hace en los paramentos despues de OUT
END;//


CREATE PROCEDURE sp_insertarCarpetas( IN nombre varchar(250), IN id_usuario int )
BEGIN 
#Podemos usar un select anterior como ejemplo

Insert into carpetas(
txt_nombre_carpetas,
id_usuarios_fk 
)
values 
( nombre , id_usuario);

 
#No hay necesidad de regresar algo, eso se hace en los paramentos despues de OUT
END;//

delimiter //
CREATE PROCEDURE sp_insertarsubCarpetas( IN nombre varchar(250), IN id_carpeta int )
BEGIN 
#Podemos usar un select anterior como ejemplo

Insert into subcarpetas(
txt_nombre_subcarpetas,
id_carpetas_fk 
)
values 
( nombre , id_carpeta);

 
#No hay necesidad de regresar algo, eso se hace en los paramentos despues de OUT
END;//

delimiter //
CREATE PROCEDURE sp_insertarArchivos( IN nombre varchar(250), IN id_subcarpeta int, IN contenido longtext )
BEGIN 
#Podemos usar un select anterior como ejemplo

Insert into archivos(
txt_nombre_archivos,
id_subcarpetas_fk,
txt_contenido_archivos 
)
values 
( nombre , id_subcarpeta, contenido);

 
#No hay necesidad de regresar algo, eso se hace en los paramentos despues de OUT
END;//

delimiter //
CREATE PROCEDURE sp_updateArchivos( IN id int , IN contenido longtext )
BEGIN 
#Podemos usar un select anterior como ejemplo

UPDATE archivos set txt_contenido_archivos = contenido where id_archivos_pk = id;  
 
#No hay necesidad de regresar algo, eso se hace en los paramentos despues de OUT
END;//


DELIMITER ;

call sp_Insertarusuarios('bruce', 'wayne',  'bruce@wayne.com','test123');

call sp_validateLogin('bruce@wayne.com','test123');

call sp_insertarCarpetas('nuevacarpeta', 1 );

call sp_insertarsubCarpetas('nuevasubcarpeta', 1 );

call sp_insertarsubCarpetas('nuevasubcarpeta', 2 );

call sp_insertarArchivos('New File.html', 1, ' Hello my man ');

call sp_updateArchivos(1,'Newman Type Longhorn');
#selects de prueba


select * from Usuarios;

select * from carpetas;

select * from subcarpetas;

select * from archivos;


select txt_nombre_subcarpetas , id_subcarpetas_pk from subcarpetas
    inner join carpetas
    where id_carpetas_pk = id_carpetas_fk
    and id_carpetas_pk = 1;



  select txt_nombre_archivos , id_archivos_pk from archivos
    inner join subcarpetas
    where id_subcarpetas_pk = id_subcarpetas_fk
    and id_subcarpetas_pk = 3;




