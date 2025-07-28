import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import * as SQLite from "expo-sqlite";
import { Card } from "react-native-paper";

type Student = {
  id: number;
  name: string;
  nisn: string;
  score: number;
};

export default function StudentListScreen() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const initDbAndFetch = async () => {
      try {
        const newDb = await SQLite.openDatabaseAsync("db.db");
        setDb(newDb);

        // Buat tabel jika belum ada
        await newDb.execAsync(`
          CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            nisn TEXT,
            score INTEGER
          );
        `);

        // Ambil data
        const result = await newDb.execAsync("SELECT * FROM students", true) as unknown as SQLite.SQLResultSetRowList[];
        const rows = result[0]?.rows as Student[] ?? [];
        setStudents(rows);
      } catch (error) {
        console.error("Gagal inisialisasi atau mengambil data siswa:", error);
      }
    };

    initDbAndFetch();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Murid</Text>
      {students.length === 0 ? (
        <Text style={styles.emptyText}>Belum ada data murid</Text>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card} mode="elevated">
              <Card.Content>
                <Text style={styles.name}>{item.name}</Text>
                <Text>NISN: {item.nisn}</Text>
                <Text>Skor: {item.score}</Text>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
    color: "#888",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
});
