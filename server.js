const express = require('express');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// 🏠 Mostrar todos los usuarios
app.get('/', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) throw err;
    res.render('index', { users: rows });
  });
});

// ➕ Mostrar formulario para agregar
app.get('/add', (req, res) => {
  res.render('add');
});

// ✅ Procesar formulario para agregar
app.post('/add', (req, res) => {
  const { name, email } = req.body;
  db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], () => {
    res.redirect('/');
  });
});

// ✏️ Mostrar formulario para editar
app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) throw err;
    res.render('edit', { user: row });
  });
});

// 📝 Procesar actualización de usuario
app.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  db.run(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [name, email, id], () => {
    res.redirect('/');
  });
});

// 🗑️ Eliminar usuario
app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', [id], () => {
    res.redirect('/');
  });
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
