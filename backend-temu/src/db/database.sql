use bwpeie9ps3tadhnabxac;
CREATE TABLE if not exists users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario_plataforma VARCHAR(255),
    nombre_plataforma VARCHAR(255),
    phone_number VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE categorias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre TEXT,
    parent_id BIGINT,
    CONSTRAINT fk_parent_id FOREIGN KEY (parent_id) REFERENCES categorias(id)
);

CREATE TABLE proveedores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre TEXT,
    numero_seguidores INT,
    productos_vendidos VARCHAR(50),
    productos_asociados INT,
    ranking DECIMAL(3, 1) -- Cambiado a DECIMAL para almacenar el rating como número de punto flotante
);

CREATE TABLE productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT,
    precio DECIMAL(10, 2),
    proveedor_id BIGINT,
    stock INT,
    imagenes JSON,
    atributos JSON,
    categoria_id BIGINT,
    precio_con_descuento DECIMAL(10, 2),
    porcentaje_descuento VARCHAR(50),
    ventas VARCHAR(50), -- Cambiado a VARCHAR para almacenar el número de productos vendidos como cadena de texto
    estrellas DECIMAL(3, 1), -- Cambiado a DECIMAL para almacenar el número de estrellas como número de punto flotante
    fecha_entrega TEXT,
    CONSTRAINT fk_proveedor_id FOREIGN KEY (proveedor_id) REFERENCES proveedores(id),
    CONSTRAINT fk_categoria_id FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2),
    estado ENUM('procesando', 'enviado', 'entregado', 'devoluciones'),
    CONSTRAINT fk_usuario_id FOREIGN KEY (usuario_id) REFERENCES users(id)
);

CREATE TABLE detalles_pedido (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pedido_id BIGINT,
    producto_id BIGINT,
    cantidad INT,
    precio DECIMAL(10, 2),
    CONSTRAINT fk_pedido_id FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    CONSTRAINT fk_producto_id FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE reseñas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    producto_id BIGINT,
    calificacion INT,
    comentario TEXT,
    fecha_reseña TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_id_reseña FOREIGN KEY (usuario_id) REFERENCES users(id),
    CONSTRAINT fk_producto_id_reseña FOREIGN KEY (producto_id) REFERENCES productos(id)
);

select * from categorias;
select * from productos;
select * from proveedores;