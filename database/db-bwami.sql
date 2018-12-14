Drop database bwami;

create database bwami;

use bwami;

SHOW TABLES;

CREATE TABLE Usuarios (
id_usuarios_pk int primary key auto_increment,
txt_nombre_usuarios varchar(50),
txt_apellido_usuarios varchar(50),
date_fechanacimiento_usuarios date,
txt_correo_usuarios varchar(255) DEFAULT NULL,
txt_password_usuarios varchar(255) DEFAULT NULL,
id_tipo_usuarios int DEFAULT 1 NOT NULL,
id_plantype_usuarios int DEFAULT 1 NOT NULL

); 

DELIMITER //
CREATE PROCEDURE sp_Insertarusuarios( IN nombre varchar(50), apellido varchar(50), IN fecha date, IN correo varchar(255), IN pass varchar(255))
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



