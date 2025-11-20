import React, { useState, useEffect, use } from "react";
import "./App.css";

function App() {
  const [remainingTime, setRemainingTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("");

  const cheerMessages = [
    "Você está indo muito bem! Continue assim e alcance seus objetivos diários.",
    "Cada minuto conta! Mantenha o foco e veja o progresso acontecer.",
    "Lembre-se: pequenas pausas levam a grandes conquistas. Você consegue!",
    "Seu esforço hoje constrói o sucesso de amanhã. Continue firme!",
    "A disciplina é o caminho para a liberdade. Mantenha-se no curso!",
    "Você é capaz de coisas incríveis. Acredite em si mesmo e vá em frente!",
    "O sucesso é a soma de pequenos esforços repetidos dia após dia. Continue!",
  ];

  const breakMessages = [
    "Ótimo trabalho! Agora é hora de relaxar e recarregar as energias.",
    "Se hidrate e aproveite sua pausa merecida!",
    "Pausas são essenciais para a produtividade. Aproveite este momento!",
    "Lembre-se de respirar fundo e deixar a mente descansar.",
    "Que tal um lanche rápido? Você merece!",
    "Você merece este tempo para si mesmo. Aproveite cada instante!",
    "Uma mente descansada é uma mente produtiva. Curta sua pausa!",
  ];

  useEffect(() => {
    let messageInterval: NodeJS.Timeout;
    if (isRunning) {
      const messages = isBreak ? breakMessages : cheerMessages;
      setEncouragement(messages[0]);
      let index = 1;
      messageInterval = setInterval(() => {
        setEncouragement(messages[index]);
        index = (index + 1) % messages.length;
      }, 15000); // Change message every 15 seconds
    } else {
      setEncouragement("");
    }
    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setRemainingTime(isBreak ? 5 * 60 : 25 * 60); // Reset to 5 minutes if break, otherwise 25 minutes
    }
  };

  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setRemainingTime(breakMode ? 5 * 60 : 25 * 60); // 5 minutes for break, 25 minutes for work
    setIsRunning(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <div>
        <button type="button" className="closeButton">
          Fechar
        </button>
      </div>
      <div className="main-content">
        <div className="main-controls">
          <button
            type="button"
            className="work-btn"
            onClick={() => switchMode(false)}
          >
            Trabalhar
          </button>
          <button
            type="button"
            className="break-btn"
            onClick={() => switchMode(true)}
          >
            Pausa
          </button>
        </div>
        <p className={`encouragement-text ${isRunning ? "visible" : ""}`}>
          {encouragement}
        </p>

        <div className="timer-display">{formatTime(remainingTime)}</div>
        <button type="button" className="start-btn" onClick={handleStart}>
          Iniciar
        </button>
      </div>
    </div>
  );
}

export default App;
