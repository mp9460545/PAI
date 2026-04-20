import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request) {
  const token = request.cookies.get('session')?.value;

  if (token) {
    const db = getDb();
    await db.execute({
      sql: 'DELETE FROM sessions WHERE token = ?',
      args: [token],
    });
    console.info('[auth] Sesja zakończona.');
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set('session', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return response;
}
