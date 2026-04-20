import { createClient } from '@libsql/client';
import path from 'path';

const DB_PATH = 'file:' + path.join(process.cwd(), 'db', 'database.sqlite');

let client;

export function getDb() {
  if (!client) {
    client = createClient({ url: DB_PATH });
  }
  return client;
}
