const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const webpayRoutes = require("../backend/webpay.route.js");
const jwt = require('jsonwebtoken'); // 👈 Importamos JWT

const app = express();
const port = 5000;
const SECRET_KEY = 'tu_clave_secreta_super_segura'; // 👈 Cámbiala en producción

app.use(cors());
app.use(express.json());

app.use("/webpay", webpayRoutes);


// Conexión a MySQL
const db = mysql.createConnection({
  host: 'bodxhia1bgfd9lyers48-mysql.services.clever-cloud.com',
  user: 'u0rtqxk97gcsgtoq',
  password: '73h1ZTBHRb797nyjYZhu',
  database: 'bodxhia1bgfd9lyers48'
});

// Endpoint productos
app.get('/producto', (req, res) => {
  const query = 'SELECT codigoProducto , nombre, precio, marca, codigo FROM producto';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al consultar productos:', err);
      res.status(500).json({ error: 'Error al obtener los productos' });
    } else {
      res.json(results);
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

      // ✅ Crear token JWT con info del usuario
      const token = jwt.sign(
        {
          id: usuario.id,
          nombre: usuario.nombre,
          correo: correo
        },
        SECRET_KEY,
        { expiresIn: '2h' }
      );

      // 🟢 Enviar token junto con ID y nombre
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


//  Iniciar servidor
app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
