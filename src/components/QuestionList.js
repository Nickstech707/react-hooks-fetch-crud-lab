import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  // State hook to store the list of questions
  const [questions, setQuestions] = useState([]);

  // Effect hook to fetch questions data on component mount
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);

  // Event handler for deleting a question
  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        // Update the questions state by filtering out the deleted question
        const updatedQuestions = questions.filter((quiz) => quiz.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  // Event handler for updating the answer of a question
  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        // Update the questions state by replacing the updated question
        const updatedQuestions = questions.map((quiz) => {
          if (quiz.id === updatedQuestion.id) return updatedQuestion;
          return quiz;
        });
        setQuestions(updatedQuestions);
      });
  }

  // Render the list of question items
  const questionItems = questions.map((quiz) => (
    <QuestionItem
      key={quiz.id}
      question={quiz}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
