import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Question: { category: string };
  Matematika: undefined;
  'Bahasa Inggris': undefined;
  Sains: undefined;
  Sejarah: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const categories = [
  {
    id: 1,
    title: "Matematika",
    image:
      "https://rencanamu.id/assets/file_uploaded/blog/1572532392-shuttersto.jpg",
  },
  {
    id: 2,
    title: "Bahasa Inggris",
    image:
      "https://esqcourse.com/wp-content/uploads/2019/02/8-Cara-Cepat-Jago-Bahasa-Inggris-yang-Bisa-Dipelajari.jpg",
  },
  {
    id: 3,
    title: "Sains",
    image:
      "https://www.smadwiwarna.sch.id/wp-content/uploads/2022/12/apa-yang-dimaksud-dengan-sains.webp",
  },
  {
    id: 4,
    title: "Sejarah",
    image:
      "https://unycommunity.com/wp-content/uploads/2022/03/Belajar-Sejarah.png",
  },
];

export default function HomeScreen({ navigation }: Props) {
  const screenMap: { [key: string]: string } = {
    Matematika: "MathInfo",
    "Bahasa Inggris": "Bahasa Inggris",
    Sains: "Sains",
    Sejarah: "Sejarah",
  };
  const handlePress = (category: string) => {
    const screenName = screenMap[category];
    if (screenName) {
      navigation.navigate(screenName as any); // gunakan as any kalau tidak didefinisikan di RootStackParamList
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pilih Kategori Quiz</Text>
      <View style={styles.cardWrapper}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.card}
            onPress={() => handlePress(cat.title)}
          >
            <Image source={{ uri: cat.image }} style={styles.image} />
            <Text style={styles.cardText}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  cardWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 12,
    width: "47%",
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
