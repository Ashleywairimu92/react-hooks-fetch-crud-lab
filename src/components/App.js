import React, { useState, useEffect } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("list");
  const [newQuestion, setNewQuestion] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    correctAnswer: "1",
  });

  useEffect(() => {
    // Simulate fetching questions from an API
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:4000/questions");
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const handleAddQuestion = (event) => {
    event.preventDefault();
    setQuestions([...questions, newQuestion]);
    setNewQuestion({ prompt: "", answer1: "", answer2: "", correctAnswer: "1" });
    setView("list");
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleUpdateAnswer = (index, value) => {
    const updatedQuestions = questions.map((question, i) =>
      i === index ? { ...question, correctAnswer: value } : question
    );
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <h1>Question Manager</h1>
      {view === "list" && (
        <>
          <button onClick={() => setView("new")}>New Question</button>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                <p>{question.prompt}</p>
                <label>
                  Correct Answer:
                  <select
                    value={question.correctAnswer}
                    onChange={(e) => handleUpdateAnswer(index, e.target.value)}
                  >
                    <option value="1">{question.answer1}</option>
                    <option value="2">{question.answer2}</option>
                    <option value="3">Option 3</option>
                  </select>
                </label>
                <button onClick={() => handleDeleteQuestion(index)}>
                  Delete Question
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {view === "new" && (
        <form onSubmit={handleAddQuestion}>
          <div>
            <label>
              Prompt:
              <input
                type="text"
                value={newQuestion.prompt}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, prompt: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Answer 1:
              <input
                type="text"
                value={newQuestion.answer1}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, answer1: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Answer 2:
              <input
                type="text"
                value={newQuestion.answer2}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, answer2: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Correct Answer:
              <input
                type="text"
                value={newQuestion.correctAnswer}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    correctAnswer: e.target.value,
                  })
                }
              />
            </label>
          </div>
          <button type="submit">Add Question</button>
        </form>
      )}
      <button onClick={() => setView("list")}>View Questions</button>
    </div>
  );
}

export default App;
