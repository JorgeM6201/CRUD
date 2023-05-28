--sirve para Mostrar todas las bases de datos
SHOW DATABASES;

--sirve para borrar una base de datos
-- DROP empleados_crud  

--Ingresa dentro de la base de datos
USE empleados_crud;   

--sirve para Mostrar todas las tablas
SHOW TABLES;

--sirve para Mostrar los detalles de una tabla.
DESCRIBE empleados;

--Instruccion para CREAR(CREATE) una tabla nueva
CREATE TABLE empleados( 
id INT AUTO_INCREMENT,
nombre VARCHAR(100) NOT NULL,
edad INT NOT NULL,
pais VARCHAR(100) NOT NULL,
cargo VARCHAR(100) NOT NULL,
anios INT NOT NULL,
PRIMARY KEY (id)
);

--Instruccion para LEER(READ) una tabla nueva
SELECT * FROM empleados;

--Instruccion para LEER(READ) una sola fila
SELECT * FROM empleados WHERE id=100;

--Instruccion para ACTUALIZAR(UPDATE) una fila una tabla
UPDATE empleados SET nombre='CARLOS', edad=30, pais='Venezuela', cargo='Gerente', anios=4 WHERE id=100;

--Instruccion para Borrar(DELETE) una sola fila
DELETE FROM empleados  WHERE id=98;