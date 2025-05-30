import React, { useState } from "react";
import questions from "./data/questions";
import QuestionCard from "./components/QuestionCard";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false); // novo estado
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(prev => prev + 1);

    setAnsweredCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setShowScore(true);
        return 0;
      }
      return newCount;
    });

    goToNextQuestion();
  };

  const handleSkip = () => {
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    setCurrent(prev => (prev + 1 < questions.length ? prev + 1 : 0));
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setAnsweredCount(0);
    setShowScore(false);
    setStarted(false);
  };

  return (
  <>
    {!started ? (
      <div className="start-screen">
        <h1 className="title">Jogo de Perguntas</h1>
        <div className="overlay">
          <h2 className="question">Pronto para jogar?</h2>
          <button className="btn-start" onClick={() => setStarted(true)}>
          
          </button>
        </div>
        <img
          src="/tela-inicial.jpg"
          alt="Início do jogo"
          className="start-image"
        />
      </div>
    ) : showScore ? (
      <div className="card">
        <h2 className="question">Placar da Rodada</h2>
        <p>Você acertou {score} de 5 perguntas respondidas.</p>
        <button
          className="btn correct"
          onClick={() => {
            setShowScore(false);
            setScore(0);
          }}
        >
          Continuar
        </button>
        <button className="btn wrong" onClick={restart}>
          Recomeçar do zero
        </button>
      </div>
    ) : (
      <div className="perguntas-screen">
    <QuestionCard
      question={questions[current].question}
      onCorrect={() => handleAnswer(true)}
      onWrong={() => handleAnswer(false)}
      onSkip={handleSkip}
    />
    </div>
    )}
  </>
);
}
export default App;
