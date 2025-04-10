Create Database friorojas;
\c friorojas;

create table usuarios( 
	id_usuario serial PRIMARY key, 
	nombre varchar(50)not NULL, 
	email varchar(50)not null UNIQUE,
	rol varchar(20)not null, 
	password text not null );

create table articulos(
	id_producto serial primary key,
	nombre_articulo varchar(50) not null, 
	descripcion text not null, 
	precio decimal(10,2) not null CHECK (precio >= 0), 
	stock int not null CHECK (stock >= 0), 
	url varchar not null,
  categoria varchar(50)not null
	);	
	
/*create table publicacion(
	id_publicacion serial primary key,
	id_producto int not null,
	id_vendedor int not null,
	FOREIGN key (id_producto) references articulos(id_producto) on delete cascade,
	FOREIGN key (id_vendedor) references usuarios(id_usuario) on delete cascade
);*/

create table favoritos(
	id_usuario int not null,
	id_producto int not null,
	FOREIGN key (id_usuario) references usuarios(id_usuario) on delete cascade,
	FOREIGN key (id_producto)references articulos(id_producto) on delete cascade,
	PRIMARY KEY (id_usuario, id_producto)
);

create table ventas(
  id_venta serial primary key,
  id_comprador int not null,
  fecha_venta timestamp default current_timestamp,total_compra decimal(10,2) not null check (total_compra >= 0),FOREIGN key (id_comprador) REFERENCES usuarios(id_usuario) on delete cascade);

create table detalle_venta(
  id_detalle_venta serial primary key,
  id_venta int not null,
  id_producto int not null,
  precio_producto decimal(10,2) not null check (precio_producto>=0),
  cantidad int not null check(cantidad>=0),
  FOREIGN KEY (id_producto) REFERENCES articulos(id_producto),
  FOREIGN KEY (id_venta) REFERENCES ventas(id_venta) ON DELETE CASCADE);

insert into usuarios (nombre,email,rol,password) values('Carlo Aguirre','carloaguirre@desafiolatam.com','admin','$2b$10$XEOS8WJEFj1/KLJVEDvfzeBiFdYN.awWxhCSSVdaGVnA8n3dp3lvy');

insert into articulos(nombre_articulo,descripcion,precio,stock,url,categoria)values ('Compresor de Refrigeración','orem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',
	  350000.00,20, 'https://picsum.photos/150?random=1','refrigeracion' ),   
      ('Termostato Digital','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',85000.00,20, 'https://picsum.photos/150?random=2','refrigeracion' ),
      ('Ventilador de Enfriamiento', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',55000.00,20, 'https://picsum.photos/150?random=3' ,'refrigeracion' ),
      ('Filtro de Aire para Refrigerador', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',30000.00,20, 'https://picsum.photos/150?random=4' ,'refrigeracion' ),
      ('Repuesto para Motor de Nevera','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 75000.00,20, 'https://picsum.photos/150?random=5' ,'refrigeracion' ),
      ('Válvula de Expansión','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 90000.00,20, 'https://picsum.photos/150?random=6' ,'refrigeracion' ),
      ('Manómetro de Refrigeración', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',45000.00,20, 'https://picsum.photos/150?random=7' ,'refrigeracion' ),
      ('Evaporador de Aire','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 450000.00, 20,'https://picsum.photos/150?random=8' ,'refrigeracion' ),
      ('Condensador de Refrigeración','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 380000.00,20, 'https://picsum.photos/150?random=9' ,'refrigeracion' ),
      ('Sensor de Temperatura','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 95000.00,20,'https://picsum.photos/150?random=10' ,'refrigeracion' ),
      ('Repuesto de Motor','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 50000.00,20,'https://picsum.photos/150?random=11' ,'refrigeracion' ),
      ('Termómetro Digital','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 25000.00,20,'https://picsum.photos/150?random=12' ,'refrigeracion' ),
    ('Aire Acondicionado Split','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',420000.00,20,  'https://picsum.photos/150?random=13','climatizacion'),
     ('Calefactor Eléctrico','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',  120000.00, 20, 'https://picsum.photos/150?random=14' ,'climatizacion'),
      ('Humidificador Ultrasónico','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 80000.00,20,  'https://picsum.photos/150?random=15' ,'climatizacion'),
      ('Deshumidificador de Aire','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',  150000.00,20,  'https://picsum.photos/150?random=16' ,'climatizacion'),
      ('Radiador de Aceite','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 200000.00, 20, 'https://picsum.photos/150?random=17' ,'climatizacion'),
      ('Filtro de Carbón Activado','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',50000.00,20, 'https://picsum.photos/150?random=18' ,'climatizacion'),
      ('Extractor de Aire', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 85000.00,20, 'https://picsum.photos/150?random=19' ,'climatizacion'),
      ('Purificador de Aire','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 220000.00,20, 'https://picsum.photos/150?random=20' ,'climatizacion'),
      ('Ventilador de Torre', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',95000.00, 20,'https://picsum.photos/150?random=21' ,'climatizacion'),
      ('Panel de Control de Climatización','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',40000.00,20,'https://picsum.photos/150?random=22' ,'climatizacion'),
      ('Aire Acondicionado de Ventana', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',300000.00,20,'https://picsum.photos/150?random=23' ,'climatizacion'),
      ('Calentador Solar','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',400000.00,20, 'https://picsum.photos/150?random=24' ,'climatizacion'),
      ('Repuesto X','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 25000.00,20, 'https://picsum.photos/150?random=25','productos_completos'),
      ('Repuesto Y','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 30000.00,20, 'https://picsum.photos/150?random=26','productos_completos'),
      ('Compresor Hermético','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',290000.00,20,'https://picsum.photos/150?random=27','productos_completos'),
      ('Tubo Capilar','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 12000.00, 20,'https://picsum.photos/150?random=28','productos_completos'),
      ('Motor de Ventilador','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 85000.00,20, 'https://picsum.photos/150?random=29','productos_completos'),
      ('Bobina de Cobre','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 110000.00,20, 'https://picsum.photos/150?random=30','productos_completos'),
      ('Condensador de Aire Acondicionado','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 275000.00,20, 'https://picsum.photos/150?random=31','productos_completos'),
      ('Unidad Exterior de Aire Acondicionado','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 500000.00,20, 'https://picsum.photos/150?random=32','productos_completos'),
      ('Tarjeta Electrónica de Control', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt',160000.00,20, 'https://picsum.photos/150?random=33','productos_completos'),
      ('Filtro de Secador','Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae asperiores saepe laboriosam suscipit deserunt', 22000.00, 20,'https://picsum.photos/150?random=34','productos_completos');