import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

const MAX_LOGIN_LENGTH = 50;
const MAX_PASSWORD_LENGTH = 128;
const SESSION_TTL_SECONDS = 60 * 60 * 24; // 24 godziny

export async function POST(request) {
  const { login, password } = await request.json();

  if (!login || !password) {
    return NextResponse.json({ error: 'Podaj login i hasło' }, { status: 400 });
  }

  if (login.length > MAX_LOGIN_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
    return NextResponse.json({ error: 'Niepoprawny login lub hasło' }, { status: 401 });
  }

  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT id, login, password FROM users WHERE login = ? AND is_active = 1',
    args: [login],
  });

  const user = result.rows[0];

  if (!user || !bcrypt.compareSync(password, user.password)) {
    console.warn(`[auth] Nieudana próba logowania: login="${login}"`);
    return NextResponse.json({ error: 'Niepoprawny login lub hasło' }, { status: 401 });
  }

  const token = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000).toISOString();

  await db.execute({
    sql: 'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)',
    args: [token, user.id, expiresAt],
  });

  console.info(`[auth] Zalogowano użytkownika: "${user.login}"`);

  const isProduction = process.env.NODE_ENV === 'production';
  const response = NextResponse.json({ ok: true });

  response.cookies.set('session', token, {
    httpOnly: true,
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
    sameSite: 'lax',
    secure: isProduction,
  });

  return response;
}
