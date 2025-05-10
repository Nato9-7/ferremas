const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // 👈 Esto debe ir antes de cualquier app.post


// 🔌 Configuración de conexión a MySQL
const db = mysql.createConnection({
  host: 'bodxhia1bgfd9lyers48-mysql.services.clever-cloud.com',
  user: 'u0rtqxk97gcsgtoq',
  password: '73h1ZTBHRb797nyjYZhu',
  database: 'bodxhia1bgfd9lyers48'
});

// 📦 Endpoint para obtener productos
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

app.post('/login', (req, res) => {
  const { correo, contraseña } = req.body;

  const query = 'SELECT id FROM usuario WHERE correo = ? AND contraseña = ?';

  db.query(query, [correo, contraseña], (err, results) => {
    if (err) {
      console.error('Error al buscar el usuario:', err);
      return res.status(500).json({ error: 'Error al consultar la base de datos' });
    }

    if (results.length > 0) {
      return res.json({ id: results[0].id, mensaje: 'Login exitoso' });
    } else {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  });
});

// 🚀 Iniciar servidor
app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
