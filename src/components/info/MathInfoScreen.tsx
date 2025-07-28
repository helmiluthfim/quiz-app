import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
    MathInfo: undefined;
    Matematika: undefined;
}

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'MathInfo'>
}

export default function MathInfoScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Quiz Matematika</Text>
        <View style={styles.infoBox}>
            <Text style={styles.infoTeks}>🕒 Durasi: 10 Menit</Text>
            <Text style={styles.infoTeks}>❓ Jumlah Soal: 10</Text>
            <Text style={styles.infoTeks}>🎯 Tingkat: Menengah</Text>
        </View>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Matematika')}>
            <Text style={styles.startButtonTeks}>Mulai Quiz</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    infoBox: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 30,
        elevation: 3,
    },
    infoTeks: {
        fontSize: 18,
        marginVertical: 6,
    },
    startButton: {
        backgroundColor: '#4e73df',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    startButtonTeks: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
})
