USE cafeteria_h4;
INSERT INTO configuracion (clave,valor) VALUES
('nombre','CoffeeHouse'),('ciudad','COCHABAMBA · BOLIVIA'),
('titulo_inicio','El Mejor Café de la Ciudad'),('subtitulo_inicio','Calidad, sabor y experiencia en cada taza.'),
('boton_inicio','EXPLORAR MENÚ'),('titulo_servicios','Una experiencia para disfrutar'),
('titulo_especialidades','Nuestras especialidades'),('titulo_nosotros','El arte de compartir café'),
('titulo_precios','Nuestro menú'),('titulo_contactos','Hablemos de café'),
('historia','Somos un espacio para encontrarnos, conversar y disfrutar café preparado con dedicación. Modifica este texto directamente en MySQL para contar la historia real de tu cafetería.'),
('direccion','Cochabamba, Bolivia (actualizar dirección exacta)'),
('telefono','+591 00000000'),('correo','hola@coffeehouse.example'),
('instagram','@coffeehouse'),('video_inicio','https://videos.pexels.com/video-files/3129595/3129595-hd_1920_1080_25fps.mp4'),
('imagen_nosotros','https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('pie_pagina','Cada taza cuenta una historia.')
ON DUPLICATE KEY UPDATE clave=clave;

INSERT INTO categorias (id,nombre,orden) VALUES (1,'Cafés',1),(2,'Bebidas frías',2),(3,'Postres',3)
ON DUPLICATE KEY UPDATE id=id;
INSERT INTO productos (id,categoria_id,nombre,descripcion,precio,imagen,disponible,orden) VALUES
(1,1,'Espresso','Intenso, aromático y recién preparado.',12.00,'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800',1,1),
(2,1,'Capuchino','Espresso con leche cremosa y espuma suave.',18.00,'https://images.pexels.com/photos/428310/pexels-photo-428310.jpeg?auto=compress&cs=tinysrgb&w=800',1,2),
(3,1,'Latte','Café suave con leche vaporizada.',20.00,'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800',1,3),
(4,2,'Frappé de café','Bebida fría, cremosa y refrescante.',24.00,'https://images.pexels.com/photos/2615323/pexels-photo-2615323.jpeg?auto=compress&cs=tinysrgb&w=800',1,4),
(5,3,'Cheesecake','Postre cremoso de la casa.',22.00,'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800',1,5),
(6,3,'Brownie','Chocolate intenso con una textura irresistible.',16.00,'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=800',1,6)
ON DUPLICATE KEY UPDATE id=id;
INSERT INTO servicios (id,titulo,descripcion,icono,activo,orden) VALUES
(1,'Café de especialidad','Preparaciones al momento con granos seleccionados.','☕',1,1),
(2,'Postres artesanales','Dulces ideales para acompañar tu bebida favorita.','🍰',1,2),
(3,'Espacio para compartir','Ambiente cómodo para amigos, familias y reuniones.','✦',1,3),
(4,'Para llevar','Pide tus bebidas favoritas y sigue tu camino.','🥤',1,4)
ON DUPLICATE KEY UPDATE id=id;
INSERT INTO especialidades (id,producto_id,etiqueta,orden) VALUES
(1,2,'Favorito de la casa',1),(2,4,'Refrescante',2),(3,5,'Dulce tentación',3)
ON DUPLICATE KEY UPDATE id=id;
INSERT INTO galeria (id,titulo,imagen,orden) VALUES
(1,'La pausa perfecta','https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=900',1),
(2,'Preparado con pasión','https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=900',2),
(3,'Momentos especiales','https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=900',3)
ON DUPLICATE KEY UPDATE id=id;
INSERT INTO horarios (id,dias,horas,orden) VALUES (1,'Lunes a viernes','08:00 – 21:00',1),(2,'Sábados y domingos','09:00 – 22:00',2)
ON DUPLICATE KEY UPDATE id=id;
INSERT INTO preguntas_frecuentes (id,pregunta,respuesta,activa) VALUES
(1,'¿Dónde están ubicados?','Estamos en Cochabamba, Bolivia. Consulta la dirección exacta en nuestra sección Contactos.',1),
(2,'¿Tienen servicio para llevar?','Sí, tenemos servicio para llevar.',1)
ON DUPLICATE KEY UPDATE id=id;
