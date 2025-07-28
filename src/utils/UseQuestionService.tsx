import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

export default function useQuestionService(db: SQLite.SQLiteDatabase | null) {
  const [questions, setQuestions] = useState<any[]>([]);

  // Ambil semua soal
  const fetchQuestions = async () => {
    if (!db) return;
    const result = await db.getAllAsync("SELECT * FROM questions");
    setQuestions(result);
  };

  // Tambah soal
  const addQuestion = async (
    question: string,
    optionA: string,
    optionB: string,
    optionC: string,
    optionD: string,
    answer: string
  ) => {
    if (!db) return;
    await db.runAsync(
      `INSERT INTO questions (question, optionA, optionB, optionC, optionD, answer)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [question, optionA, optionB, optionC, optionD, answer]
    );
    await fetchQuestions(); // refresh list
  };

  // Edit soal
  const updateQuestion = async (
    id: number,
    question: string,
    optionA: string,
    optionB: string,
    optionC: string,
    optionD: string,
    answer: string
  ) => {
    if (!db) return;
    await db.runAsync(
      `UPDATE questions
       SET question=?, optionA=?, optionB=?, optionC=?, optionD=?, answer=?
       WHERE id=?`,
      [question, optionA, optionB, optionC, optionD, answer, id]
    );
    await fetchQuestions();
  };

  // Hapus soal
  const deleteQuestion = async (id: number) => {
    if (!db) return;
    await db.runAsync(`DELETE FROM questions WHERE id=?`, [id]);
    await fetchQuestions();
  };

  useEffect(() => {
    if (db) fetchQuestions();
  }, [db]);

  return { questions, fetchQuestions, addQuestion, updateQuestion, deleteQuestion };
}
