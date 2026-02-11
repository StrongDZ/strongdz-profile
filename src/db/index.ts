import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import { existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';

// Ensure data directory exists
const dbPath = process.env.DATABASE_URL?.replace('file:', '') || join(process.cwd(), 'data', 'portfolio.db');
const dataDir = dirname(dbPath);

if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
}

// Initialize SQLite connection
const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');

// Create Drizzle instance with schema
export const db = drizzle(sqlite, { schema });

export { schema };
