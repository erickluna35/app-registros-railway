const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Ejecutar todo dentro del serialize, como antes
db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )`);

  db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, ['Juan Pérez', 'juan@example.com']);
  db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, ['Ana García', 'ana@example.com']);
});

// ✅ Esta línea arregla el problema
module.exports = db;

