import { getDb } from '@/lib/db';

/**
 * Sprawdza token sesji w bazie danych.
 * Zwraca obiekt { id, login } zalogowanego użytkownika lub null.
 */
export async function validateSession(token) {
  if (!token) return null;

  const db = getDb();
  const result = await db.execute({
    sql: `
      SELECT u.id, u.login
      FROM sessions s
      JOIN users u ON u.id = s.user_id
      WHERE s.token = ?
        AND u.is_active = 1
        AND s.expires_at > datetime('now')
    `,
    args: [token],
  });

  return result.rows[0] ?? null;
}
