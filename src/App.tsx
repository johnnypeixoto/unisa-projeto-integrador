import React, { useState, useEffect, use } from "react";
import marioLevelCompleteSound from "./assets/mario_level_complete.mp3";
import marioCoinSound from "./assets/mario_coin.mp3";
import marioGameOverSound from "./assets/mario_game_over.mp3";
import marioStartSound from "./assets/mario_start.mp3";
import "./App.css";

function App() {
  const [remainingTime, setRemainingTime] = useState(1 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("");
  const [branchText, setBranchText] = useState("");
  const marioLevelComplete = new Audio(marioLevelCompleteSound);
  const marioCoin = new Audio(marioCoinSound);
  const marioGameOver = new Audio(marioGameOverSound);
  const marioStart = new Audio(marioStartSound);

  const cheerMessages = [
    "Tá indo bem demais! Continua assim! 🔥",
    "Foco total! Cada minuto conta! ⏱️",
    "Você consegue! Bora lá! 💪",
    "Mandando bem! Segue o jogo! 🎯",
    "Concentrado? Top! Não para não! 🚀",
    "Show de bola! Tá arrasando! ⭐",
    "Firme e forte! Produtividade ON! 💯",
  ];

  const breakMessages = [
    "Bora beber uma água! 💧",
    "Hora de se alongar! 🧘",
    "Que tal um lanchinho? 🍪",
    "Respira fundo e relaxa! 😌",
    "Levanta e caminha um pouco! 🚶",
    "Descansa os olhos da tela! 👀",
    "Café quentinho? ☕️",
  ];

  const marioLevels = [
    "main-castle 🏰",
    "feature/bowser-boss 🐢",
    "develop/underground-pipes 🕳️",
    "hotfix/turtle-shell 🐚",
    "bugfix/broken-block 🧱",
    "release/star-power ⭐",
    "staging/cloud-world ☁️",
    "feature/fire-flower 🔥",
    "develop/warp-zone 🌀",
    "hotfix/missing-mushroom 🍄",
    "feature/rainbow-road 🌈",
    "bugfix/glitchy-pipe 🔧",
    "release/final-flagpole 🚩",
    "develop/underwater-level 🌊",
    "feature/koopa-fortress 🛡️",
    "staging/peach-castle 👑",
    "hotfix/lava-pit 🌋",
    "feature/yoshi-island 🦖",
    "develop/ghost-house 👻",
    "release/world-8-4 🎮",
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
    marioStart.play().catch((error) => {
      console.error("Error playing sound:", error);
    });
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setRemainingTime(isBreak ? 5 * 60 : 1 * 60); // Reset to 5 minutes if break, otherwise 25 minutes
    }
  };

  const switchMode = (breakMode: boolean) => {
    marioCoin.play().catch((error) => {
      console.error("Error playing sound:", error);
    });
    setIsBreak(breakMode);
    setRemainingTime(breakMode ? 5 * 60 : 1 * 60); // 5 minutes for break, 25 minutes for work
    setIsRunning(false);

    // Update branch text with a random Mario level
    const randomIndex = Math.floor(Math.random() * marioLevels.length);
    setBranchText(marioLevels[randomIndex]);
  };

  useEffect(() => {
    if (remainingTime === 0 && isRunning) {
      if (isBreak) {
        marioGameOver.play().catch((error) => {
          console.error("Error playing sound:", error);
        });
      }
      if (!isBreak) {
        marioLevelComplete.play().catch((error) => {
          console.error("Error playing sound:", error);
        });
      }
      setIsRunning(false);
      setRemainingTime(isBreak ? 1 * 60 : 5 * 60); // Switch modes automatically
      setIsBreak(!isBreak);
    }
  }, [remainingTime]);

  return (
    <div className="main-container">
      <div>
        <button type="button" className="closeButton">
          ✕
        </button>
      </div>
      <header className="header-container">
        <img
          src={require("./assets/pomodorotech.svg").default}
          alt="PomoDoroTech"
          height={150}
        />
      </header>
      <div className="main-content">
        <div className="main-controls">
          <button
            type="button"
            className={`work-btn ${!isBreak ? "active-btn" : ""}`}
            onClick={() => switchMode(false)}
          >
            ⚡ Trabalhar
          </button>
          <button
            type="button"
            className={`break-btn ${isBreak ? "active-btn" : ""}`}
            onClick={() => switchMode(true)}
          >
            ⏸ Pausa
          </button>
        </div>
        {/* <p className={`encouragement-text ${isRunning ? "visible" : ""}`}>
          {encouragement}
        </p> */}

        <div className="pomo-terminal">
          <header className="header-window">
            <div className="window-buttons">
              <div className="circle-button red-background " />
              <div className="circle-button yellow-background " />
              <div className="circle-button green-background" />
            </div>
            <div className="terminal-title">
              <span>Terminal</span>
              <span>❯_</span>
            </div>
            <div style={{ width: "42px" }} />
          </header>
          <div className="header-path">
            <span className="yellow-text-highlight">Dev</span>
            <span className="purple-text-highlight">in</span>
            <span className="blue-text-highlight">
              {isBreak ? "break" : "work"}
            </span>
            <span className="purple-text-highlight">on</span>
            <span className="pink-text-highlight"></span>
            <span className="pink-text-highlight">{branchText}</span>
          </div>
          <div className="terminal-message">
            {/* <span className="log-icon">❯</span>
            <span className="log-text">Log</span> */}
            <span
              className={`terminal-log-font encouragement-text ${
                isRunning ? "visible" : ""
              }`}
            >
              <span className="log-text">❯ Log</span> {encouragement}
            </span>
          </div>
        </div>
        <div className="footer-container">
          <div className="timer-display">{formatTime(remainingTime)}</div>
          {!isRunning && (
            <button type="button" className="start-btn" onClick={handleStart}>
              ⏵ Iniciar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
