Drop database bwami;

create database bwami;

use bwami;

SHOW TABLES;

CREATE TABLE Usuarios (
id_usuarios_pk int primary key auto_increment,
txt_nombre_usuarios varchar(50),
txt_apellido_usuarios varchar(50),
date_fechanacimiento_usuarios date,
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
id_subcarpetas_fk int
);




DELIMITER //
CREATE PROCEDURE sp_Insertarusuarios( IN nombre varchar(50), apellido varchar(50), IN fecha timestamp, IN correo varchar(255), IN pass varchar(255))
BEGIN 
#Podemos usar un select anterior como ejemplo
INSERT INTO Usuarios(
txt_nombre_usuarios,
txt_apellido_usuarios,
date_fechanacimiento_usuarios,
txt_correo_usuarios,
txt_password_usuarios
)
values (nombre,apellido, fecha, correo, md5(pass));

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

set @idcarpeta = (select id_carpetas_pk from carpetas where current_timestamp = date_creacion_carpetas and txt_nombre_carpetas='Proyectos'); 

Insert into subcarpetas(
txt_nombre_subcarpetas,
id_carpetas_fk 
)
values 
('Mi primer Proyecto',@idcarpeta);

set @idsubcarpeta = (select id_subcarpetas_pk from subcarpetas where current_timestamp = date_creacion_subcarpetas);

Insert into archivos(
txt_nombre_archivos,
id_subcarpetas_fk 
)
values 
('Ejemplo.html',@idsubcarpeta),
('Ejemplo.js',@idsubcarpeta),
('Ejemplo.css',@idsubcarpeta),
('Ejemplo.txt',@idsubcarpeta);
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

DELIMITER ;

call sp_Insertarusuarios('bruce', 'wayne', 1993-05-05, 'bruce@wayne.com','test123');

call sp_validateLogin('bruce@wayne.com','test123');


select * from Usuarios

select * from carpetas

select * from subcarpetas

select * from archivos

