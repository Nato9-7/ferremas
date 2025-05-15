const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const webpayRoutes = require("../backend/webpay.route.js");
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;
const SECRET_KEY = 'tu_clave_secreta_super_segura';

app.use(cors());
app.use(express.json());

app.use("/webpay", webpayRoutes);

// ✅ Pool de conexiones
const db = mysql.createPool({
  host: 'bodxhia1bgfd9lyers48-mysql.services.clever-cloud.com',
  user: 'u0rtqxk97gcsgtoq',
  password: '73h1ZTBHRb797nyjYZhu',
  database: 'bodxhia1bgfd9lyers48',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

// ✅ Endpoint productos (con campo `categoria`)
app.get('/producto', (req, res) => {
  const query = 'SELECT codigoProducto, nombre, precio, marca, categoria FROM producto';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al consultar productos:', err);
      res.status(500).json({ error: 'Error al obtener los productos' });
    } else {
      res.json(results); // 👈 Esto debe ser un array
    }
  });
});

// 🔐 Login con token JWT
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

// 🧾 Endpoint para registrar usuarios
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

// 🟢 Iniciar servidor
app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
