CREATE DATABASE IF NOT EXISTS restaurante_resv;
USE restaurante_resv;

CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefono VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS mesas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  capacidad INT NOT NULL,
  estado ENUM('Disponible', 'Ocupada', 'Reservada') DEFAULT 'Disponible'
);

CREATE TABLE IF NOT EXISTS reservaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  mesa_id INT,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  personas INT NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL,
  FOREIGN KEY (mesa_id) REFERENCES mesas(id) ON DELETE SET NULL
);


-- Datos de prueba (solo si las tablas están vacías)
INSERT INTO mesas (nombre, capacidad, estado) 
SELECT 'Mesa 1', 4, 'Disponible' WHERE NOT EXISTS (SELECT 1 FROM mesas WHERE nombre = 'Mesa 1');

INSERT INTO mesas (nombre, capacidad, estado) 
SELECT 'Mesa 2', 2, 'Ocupada' WHERE NOT EXISTS (SELECT 1 FROM mesas WHERE nombre = 'Mesa 2');

INSERT INTO mesas (nombre, capacidad, estado) 
SELECT 'Mesa 3', 6, 'Disponible' WHERE NOT EXISTS (SELECT 1 FROM mesas WHERE nombre = 'Mesa 3');

INSERT INTO clientes (nombre, email, telefono) 
SELECT 'Juan Perez', 'juan@example.com', '555-1234' WHERE NOT EXISTS (SELECT 1 FROM clientes WHERE email = 'juan@example.com');

INSERT INTO clientes (nombre, email, telefono) 
SELECT 'Maria Lopez', 'maria@example.com', '555-5678' WHERE NOT EXISTS (SELECT 1 FROM clientes WHERE email = 'maria@example.com');
