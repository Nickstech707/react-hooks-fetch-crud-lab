import React from "react";

function QuestionItem({ question, onDeleteClick, onAnswerChange }) {
  // Destructure the question object to extract its properties
  const { id, prompt, answers, correctIndex } = question;

  // Map over the answers array to create an array of <option> elements
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      {/* Display the question ID */}
      <h4>Question {id}</h4>

      {/* Display the question prompt */}
      <h5>Prompt: {prompt}</h5>

      <label>
        {/* Display the correct answer label */}
        Correct Answer:
        {/* Render the <select> element for selecting the correct answer */}
        <select
          defaultValue={correctIndex}
          onChange={(event) => onAnswerChange(id, parseInt(event.target.value))}
        >
          {options}
        </select>
      </label>

      {/* Render the "Delete Question" button */}
      <button onClick={() => onDeleteClick(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
