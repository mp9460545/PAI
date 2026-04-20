// node db/seed.js

const { createClient } = require('@libsql/client');
const bcrypt = require('bcryptjs');
const path = require('path');

const db = createClient({
  url: 'file:' + path.join(__dirname, 'database.sqlite'),
});

async function seed() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      login      TEXT UNIQUE NOT NULL,
      password   TEXT NOT NULL,
      is_active  INTEGER NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS sessions (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      token      TEXT UNIQUE NOT NULL,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expires_at TIMESTAMP NOT NULL
    )
  `);

  const users = [
    { login: 'admin', password: 'admin' },
    { login: 'user',  password: 'user'  },
  ];

  for (const user of users) {
    const hash = bcrypt.hashSync(user.password, 10);
    await db.execute({
      sql: 'INSERT OR IGNORE INTO users (login, password) VALUES (?, ?)',
      args: [user.login, hash],
    });
    console.log(`Dodano użytkownika: ${user.login}`);
  }

  console.log('Baza danych gotowa.');
}

seed().catch(console.error);
