import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('db.db');

type Student = {
  id: number;
  name: string;
  nisn: string;
  score: number;
  category: string;
};

export default function AdminHome() {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      // Pastikan kolom 'category' sudah ada di tabel 'students'
      await db.execAsync(`
        ALTER TABLE students ADD COLUMN category TEXT
      `).catch(() => {}); // abaikan error jika kolom sudah ada

      const result = await db.getAllAsync(`SELECT * FROM students`);
      setStudents(result as Student[]);
    } catch (error) {
      console.error('Gagal mengambil data murid:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert(
      'Hapus Data',
      'Apakah Anda yakin ingin menghapus data murid ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await db.runAsync(`DELETE FROM students WHERE id = ?`, [id]);
              fetchStudents();
            } catch (error) {
              console.error('Gagal menghapus murid:', error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Student }) => (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>NISN: {item.nisn}</Text>
        <Text>Nilai: {item.score}</Text>
        <Text>Kategori: {item.category || '-'}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Murid</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
