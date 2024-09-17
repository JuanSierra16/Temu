use bwpeie9ps3tadhnabxac;

CREATE TABLE if not exists users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario_plataforma VARCHAR(255),
    nombre_plataforma VARCHAR(255),
    phone_number VARCHAR(20)
);

select * from users;