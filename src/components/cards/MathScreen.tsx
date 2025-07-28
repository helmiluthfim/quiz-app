import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: "Berapakah hasil dari 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Berapakah hasil dari 5 x 3?",
    options: ["15", "20", "10", "13"],
    answer: "15",
  },
  {
    question: "Berapakah akar dari 81?",
    options: ["7", "8", "9", "10"],
    answer: "9",
  },
];

export default function MathQuizScreen({ navigation }: any) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const currentQuestion = questions[current];

  const handleSelect = (option: string) => {
    if (isDisabled) return; // cegah klik ganda

    setSelected(option);
    setIsDisabled(true);

    const isCorrect = option === currentQuestion.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      setSelected(null);
      setFeedback(null);
      setIsDisabled(false);

      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
      } else {
        navigation.navigate("Hasil", {
          score: isCorrect ? score + 1 : score,
          total: questions.length,
        });
      }
    }, 1000); // tunggu 1 detik sebelum next
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {current + 1}. {currentQuestion.question}
      </Text>

      {currentQuestion.options.map((option) => {
        let optionStyle = styles.option;

        if (selected) {
          if (option === currentQuestion.answer) {
            optionStyle = styles.correctOption;
          } else if (option === selected) {
            optionStyle = styles.wrongOption;
          }
        }

        return (
          <TouchableOpacity
            key={option}
            style={optionStyle}
            onPress={() => handleSelect(option)}
            disabled={isDisabled}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#f2f2f2'
  },
  question: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "bold",
  },
  option: {
    backgroundColor: "#ffffff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  correctOption: {
    backgroundColor: "#8be78b", // hijau
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  wrongOption: {
    backgroundColor: "#f28b82", // merah
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
  },
});