import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('db.db');

type LoginScreenProps = {
  onLoginSuccess: () => void;
};

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const navigation = useNavigation<any>();
  const [role, setRole] = useState<'guru' | 'murid'>('murid');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nisn, setNisn] = useState('');

  const handleLoginGuru = () => {
    if (username === 'admin' && password === 'admin123') {
      onLoginSuccess();
      navigation.navigate('AdminHome');
    } else {
      Alert.alert('Login Gagal', 'Username atau password salah.');
    }
  };

  const handleLoginMurid = async () => {
    if (!name || !nisn) {
      Alert.alert('Data tidak lengkap', 'Harap isi nama dan NISN.');
      return;
    }

    try {
      // ✅ Buat tabel jika belum ada, dengan UNIQUE di nisn
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS students (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          nisn TEXT UNIQUE,
          score INTEGER
        );
      `);

      // 🔍 Cek apakah nisn sudah terdaftar
      const existing = await db.getFirstAsync(
        `SELECT * FROM students WHERE nisn = ?`,
        [nisn]
      );

      if (!existing) {
        // ❗ Insert hanya jika belum ada
        await db.runAsync(
          `INSERT INTO students (name, nisn, score) VALUES (?, ?, ?)`,
          [name, nisn, 0]
        );
      }

      // ✅ Navigasi ke halaman Home
      onLoginSuccess();
      navigation.navigate('Home', { name, nisn });
    } catch (error: any) {
      if (error.message?.includes('UNIQUE')) {
        Alert.alert('Login Gagal', 'NISN sudah terdaftar.');
      } else {
        console.error('Gagal menyimpan murid:', error);
        Alert.alert('Error', 'Terjadi kesalahan saat login.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Sebagai</Text>
      <View style={styles.roleSwitch}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'murid' && styles.selectedRole]}
          onPress={() => setRole('murid')}
        >
          <Text style={styles.roleText}>Murid</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'guru' && styles.selectedRole]}
          onPress={() => setRole('guru')}
        >
          <Text style={styles.roleText}>Guru</Text>
        </TouchableOpacity>
      </View>

      {role === 'guru' ? (
        <>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleLoginGuru}>
            <Text style={styles.buttonText}>Login Guru</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Nama"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="NISN"
            value={nisn}
            onChangeText={setNisn}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleLoginMurid}>
            <Text style={styles.buttonText}>Login Murid</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  roleSwitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  roleButton: {
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: '#d6d6d6ff',
    borderRadius: 8,
  },
  selectedRole: {
    backgroundColor: '#4e73df',
  },
  roleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#4e73df',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
