const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const webpayRoutes = require("../backend/webpay.route.js");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;
const SECRET_KEY = 'tu_clave_secreta_super_segura';

app.use(cors());
app.use(express.json());

app.use("/webpay", webpayRoutes);

// Servir imágenes estáticas
app.use(
  '/ImgProductos',
  express.static(path.join(__dirname, '..', 'public', 'ImgProductos'))
);

// Configuración de multer para guardar imágenes en /public/ImgProductos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ruta = path.join(__dirname, '..', 'public', 'ImgProductos');
    cb(null, ruta);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Conexión a MySQL
const db = mysql.createConnection( {
  host: 'bodxhia1bgfd9lyers48-mysql.services.clever-cloud.com',
  user: 'u0rtqxk97gcsgtoq',
  password: '73h1ZTBHRb797nyjYZhu',
  database: 'bodxhia1bgfd9lyers48',});



// Endpoint para obtener productos
app.get('/producto', (req, res) => {
  const query = 'SELECT codigoProducto, nombre, precio, marca, categoria FROM producto';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al consultar productos:', err);
      res.status(500).json({ error: 'Error al obtener los productos' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint para subir producto con imagen
app.post('/producto', upload.single('imagen'), (req, res) => {
  console.log("Entró al endpoint /producto");
  const { nombre, precio, marca, categoria } = req.body; // <-- agrega categoria
  const imagen = req.file ? req.file.filename : null;

  console.log("Datos recibidos:", { nombre, precio, marca, categoria, imagen });

  if (!nombre || !precio || !marca || !categoria || !imagen) {
    console.error('Campos faltantes:', { nombre, precio, marca, categoria, imagen });
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const codigoProducto = `FER-${Math.floor(100000 + Math.random() * 900000)}`;
  const codigo = nombre.trim().substring(0, 4).toUpperCase() + '-' + precio;

  console.log("Intentando insertar:", { codigoProducto, nombre, precio, marca, categoria, codigo });

  const query = `
    INSERT INTO producto (codigoProducto, nombre, precio, marca, categoria, codigo)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [codigoProducto, nombre, precio, marca, categoria, codigo],
    (err, results) => {
      if (err) {
        console.error('Error al guardar el producto:', err);
        return res.status(500).json({ error: 'Error al guardar el producto', detalle: err });
      } else {
        console.log('Producto guardado exitosamente:', results);
        res.status(201).json({ mensaje: 'Producto subido exitosamente', imagen, codigoProducto, codigo });
      }
    }
  );
});

// Login con token JWT
app.post('/login', (req, res) => {
  const { correo, contraseña } = req.body;

  const query = 'SELECT id, nombre FROM usuario WHERE correo = ? AND contraseña = ?';

  db.query(query, [correo, contraseña], (err, results) => {
    if (err) {
      console.error('Error al buscar el usuario:', err);
      return res.status(500).json({ error: 'Error al consultar la base de datos' });
    }

    if (results.length > 0) {
      const usuario = results[0];

      const token = jwt.sign(
        {
          id: usuario.id,
          nombre: usuario.nombre,
          correo: correo
        },
        SECRET_KEY,
        { expiresIn: '2h' }
      );

      return res.json({
        id: usuario.id,
        nombre: usuario.nombre,
        token,
        mensaje: 'Login exitoso'
      });
    } else {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  });
});

// Endpoint para registrar usuarios
app.post('/register', (req, res) => {
  const { nombre, apellido, correo, contraseña, numero_telefono } = req.body;

  if (!nombre || !apellido || !correo || !contraseña || !numero_telefono) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const query = `
    INSERT INTO usuario (contraseña, correo, nombre, apellidos, numerotelf)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [contraseña, correo, nombre, apellido, numero_telefono],
    (err, results) => {
      if (err) {
        console.error('Error al registrar el usuario:', err);
        return res.status(500).json({ error: 'Error al registrar el usuario' });
      }

      res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    }
  );
});

// Endpoint para obtener datos del usuario autenticado
app.get('/usuario', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No autorizado" });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    db.query(
      "SELECT id, nombre, apellidos as apellido, correo, numerotelf as numero_telefono FROM usuario WHERE id = ?",
      [decoded.id],
      (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
        console.log("Respuesta usuario:", results[0]);
        res.json(results[0]);
      }
    );
  } catch (error) {
    res.status(401).json({ error: "Token inválido", detalle: error.message });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
