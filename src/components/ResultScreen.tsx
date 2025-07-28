import React, { useCallback } from "react";
import { View, Text, StyleSheet, Button, BackHandler } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

export default function ResultScreen({ route, navigation }: any) {
  const { score, total } = route.params;
  const percent = Math.round((score / total) * 100);

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true // blokir tombol back
      );

      return () => backHandler.remove(); // ✅ cara terbaru
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Selesai!</Text>
      <Text style={styles.score}>
        Jawaban benar: {score} dari {total}
      </Text>
      <Text style={styles.percent}>Skor: {percent}%</Text>

      <View style={styles.buttonSpacing}>
        <Button title="Main Lagi" onPress={() => navigation.replace("MathInfo")} />
      </View>
      <Button
        title="Kembali ke Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  score: {
    fontSize: 20,
    marginBottom: 24,
  },
  percent: {
    fontSize: 18,
    marginBottom: 24,
    color: "#4e73df",
  },
  buttonSpacing: {
    marginBottom: 12,
  },
});
