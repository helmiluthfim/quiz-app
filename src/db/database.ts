import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

export default function useInitDatabase() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  useEffect(() => {
    const initDb = async () => {
      const newDb = await SQLite.openDatabaseAsync("quiz.db");
      setDb(newDb);

      await newDb.execAsync(`
        -- Tabel Users (guru dan murid)
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          nisn TEXT,
          role TEXT NOT NULL, -- 'guru' atau 'murid'
          password TEXT
        );

        -- Tabel Questions
        CREATE TABLE IF NOT EXISTS questions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          question TEXT NOT NULL,
          optionA TEXT NOT NULL,
          optionB TEXT NOT NULL,
          optionC TEXT NOT NULL,
          optionD TEXT NOT NULL,
          answer TEXT NOT NULL
        );

        -- Tabel Scores
        CREATE TABLE IF NOT EXISTS scores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER,
          name TEXT,
          nisn TEXT,
          score INTEGER,
          percentage INTEGER
        );
      `);
    };

    initDb();
  }, []);

  return db;
}
