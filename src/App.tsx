import { useState, useEffect, useMemo, useCallback } from "react";
import marioLevelCompleteSound from "./assets/mario_level_complete.mp3";
import marioCoinSound from "./assets/mario_coin.mp3";
import marioGameOverSound from "./assets/mario_game_over.mp3";
import marioStartSound from "./assets/mario_start.mp3";
import "./App.css";

// ==================== CONSTANTES ====================
const WORK_TIME = 25 * 60; // 25 minutos em segundos
const BREAK_TIME = 5 * 60; // 5 minutos em segundos
const MESSAGE_INTERVAL = 15000; // 15 segundos para rotação de mensagens

function App() {
  // ==================== ESTADOS ====================
  const [remainingTime, setRemainingTime] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("");
  const [branchText, setBranchText] = useState("");

  // ==================== ÁUDIOS ====================
  // Memoização dos objetos de áudio para evitar recriação desnecessária
  const audioFiles = useMemo(
    () => ({
      levelComplete: new Audio(marioLevelCompleteSound),
      coin: new Audio(marioCoinSound),
      gameOver: new Audio(marioGameOverSound),
      start: new Audio(marioStartSound),
    }),
    []
  );

  // ==================== MENSAGENS ====================
  // Mensagens motivacionais exibidas durante o modo trabalho
  const cheerMessages = useMemo(
    () => [
      "Tá indo bem demais! Continua assim! 🔥",
      "Foco total! Cada minuto conta! ⏱️",
      "Você consegue! Bora lá! 💪",
      "Mandando bem! Segue o jogo! 🎯",
      "Concentrado? Top! Não para não! 🚀",
      "Show de bola! Tá arrasando! ⭐",
      "Firme e forte! Produtividade ON! 💯",
    ],
    []
  );

  // Mensagens de autocuidado exibidas durante o modo pausa
  const breakMessages = useMemo(
    () => [
      "Bora beber uma água! 💧",
      "Hora de se alongar! 🧘",
      "Que tal um lanchinho? 🍪",
      "Respira fundo e relaxa! 😌",
      "Levanta e caminha um pouco! 🚶",
      "Descansa os olhos da tela! 👀",
      "Café quentinho? ☕️",
    ],
    []
  );

  // Nomes de branches inspirados no universo Mario para exibição no terminal
  const marioLevels = useMemo(
    () => [
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
    ],
    []
  );

  // ==================== FUNÇÕES AUXILIARES ====================
  /**
   * Formata o tempo de segundos para o formato MM:SS
   * @param time - Tempo em segundos a ser formatado
   * @returns String formatada no padrão MM:SS (ex: "25:00")
   */
  const formatTime = useCallback((time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, []);

  /**
   * Reproduz um arquivo de áudio com tratamento de erro
   * @param audio - Objeto HTMLAudioElement a ser reproduzido
   */
  const playSound = useCallback((audio: HTMLAudioElement) => {
    audio.play().catch((error) => {
      console.error("Erro ao reproduzir som:", error);
    });
  }, []);

  /**
   * Seleciona aleatoriamente uma branch do array marioLevels
   * @returns String com o nome da branch selecionada
   */
  const getRandomBranch = useCallback((): string => {
    const randomIndex = Math.floor(Math.random() * marioLevels.length);
    return marioLevels[randomIndex];
  }, [marioLevels]);

  // ==================== INICIALIZAÇÃO ====================
  /**
   * Effect: Define uma branch aleatória ao iniciar a aplicação
   * - Executa apenas uma vez na montagem do componente
   */
  useEffect(() => {
    setBranchText(getRandomBranch());
  }, [getRandomBranch]);

  // ==================== HANDLERS DE EVENTOS ====================
  /**
   * Gerencia o início e pausa do temporizador
   * - Se não estiver rodando: inicia o timer
   * - Se estiver rodando: pausa e reseta o tempo baseado no modo atual
   */
  const handleStart = useCallback(() => {
    playSound(audioFiles.start);

    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setRemainingTime(isBreak ? BREAK_TIME : WORK_TIME);
    }
  }, [isRunning, isBreak, audioFiles.start, playSound]);

  /**
   * Alterna entre modo trabalho e modo pausa
   * - Atualiza o estado do modo
   * - Define o tempo apropriado (trabalho ou pausa)
   * - Para o timer se estiver rodando
   * - Seleciona uma nova branch aleatória
   * @param breakMode - true para ativar modo pausa, false para modo trabalho
   */
  const switchMode = useCallback(
    (breakMode: boolean) => {
      playSound(audioFiles.coin);
      setIsBreak(breakMode);
      setRemainingTime(breakMode ? BREAK_TIME : WORK_TIME);
      setIsRunning(false);
      setBranchText(getRandomBranch());
    },
    [audioFiles.coin, playSound, getRandomBranch]
  );

  // ==================== EFFECTS ====================
  /**
   * Effect: Gerencia a rotação automática de mensagens motivacionais
   * - Exibe mensagens diferentes baseadas no modo (trabalho ou pausa)
   * - Alterna entre as mensagens a cada 15 segundos
   * - Limpa as mensagens quando o timer para
   */
  useEffect(() => {
    if (!isRunning) {
      setEncouragement("");
      return;
    }

    const messages = isBreak ? breakMessages : cheerMessages;
    setEncouragement(messages[0]);
    let index = 1;

    const messageInterval = setInterval(() => {
      setEncouragement(messages[index]);
      index = (index + 1) % messages.length;
    }, MESSAGE_INTERVAL);

    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak, breakMessages, cheerMessages]);

  /**
   * Effect: Gerencia a contagem regressiva do temporizador
   * - Decrementa o tempo restante a cada 1 segundo
   * - Só executa quando o timer está ativo e há tempo restante
   */
  useEffect(() => {
    if (!isRunning || remainingTime <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  /**
   * Effect: Gerencia a transição automática entre modos quando o tempo acaba
   * - Detecta quando o tempo chega a zero
   * - Toca o som apropriado (level complete para trabalho, game over para pausa)
   * - Para o timer atual
   * - Define o tempo do próximo modo
   * - Alterna automaticamente para o outro modo
   * - Seleciona uma nova branch aleatória
   */
  useEffect(() => {
    if (remainingTime !== 0 || !isRunning) {
      return;
    }

    // Seleciona e toca o som apropriado baseado no modo atual
    const soundToPlay = isBreak
      ? audioFiles.gameOver
      : audioFiles.levelComplete;
    playSound(soundToPlay);

    // Para o timer e prepara para o próximo ciclo
    setIsRunning(false);
    setRemainingTime(isBreak ? WORK_TIME : BREAK_TIME);
    setIsBreak(!isBreak);
    setBranchText(getRandomBranch());
  }, [
    remainingTime,
    isRunning,
    isBreak,
    audioFiles,
    playSound,
    getRandomBranch,
  ]);

  // ==================== HANDLER FECHAR APLICAÇÃO ====================
  const handleCloseClick = () => {
    if (window.electronAPI?.closeApp) {
      window.electronAPI.closeApp();
    } else {
      console.warn("Electron API not available");
    }
  };

  // ==================== RENDERIZAÇÃO ====================
  return (
    <div className="main-container">
      {/* Botão de fechar aplicação */}
      <div>
        <button
          type="button"
          className="closeButton"
          aria-label="Fechar"
          onClick={handleCloseClick}
        >
          ✕
        </button>
      </div>

      {/* Logo do aplicativo */}
      <header className="header-container">
        <img
          src={require("./assets/pomodorotech.svg").default}
          alt="PomoDoroTech"
          height={150}
        />
      </header>

      {/* Conteúdo principal da aplicação */}
      <div className="main-content">
        {/* Controles para alternar entre modo trabalho e pausa */}
        <div className="main-controls">
          <button
            type="button"
            className={`work-btn ${!isBreak ? "active-btn" : ""}`}
            onClick={() => switchMode(false)}
            aria-label="Modo Trabalho"
          >
            ⚡ Trabalhar
          </button>
          <button
            type="button"
            className={`break-btn ${isBreak ? "active-btn" : ""}`}
            onClick={() => switchMode(true)}
            aria-label="Modo Pausa"
          >
            ⏸ Pausa
          </button>
        </div>

        {/* Interface de terminal visual */}
        <div className="pomo-terminal">
          {/* Cabeçalho do terminal com botões decorativos */}
          <header className="header-window">
            <div className="window-buttons">
              <div
                className="circle-button red-background"
                aria-hidden="true"
              />
              <div
                className="circle-button yellow-background"
                aria-hidden="true"
              />
              <div
                className="circle-button green-background"
                aria-hidden="true"
              />
            </div>
            <div className="terminal-title">
              <span>Terminal</span>
              <span>❯_</span>
            </div>
            <div style={{ width: "42px" }} />
          </header>

          {/* Caminho do terminal simulando um ambiente git */}
          <div className="header-path">
            <span className="yellow-text-highlight">Dev</span>
            <span className="purple-text-highlight">in</span>
            <span className="blue-text-highlight">
              {isBreak ? "break" : "work"}
            </span>
            <span className="purple-text-highlight">on</span>
            <span className="pink-text-highlight">{branchText}</span>
          </div>

          {/* Área de log com mensagens motivacionais */}
          <div className="terminal-message">
            <span
              className={`terminal-log-font encouragement-text ${
                isRunning ? "visible" : ""
              }`}
            >
              <span className="log-text">❯ Log</span> {encouragement}
            </span>
          </div>
        </div>

        {/* Rodapé com timer e botão de controle */}
        <div className="footer-container">
          {/* Display do tempo restante */}
          <div className="timer-display" aria-live="polite">
            {formatTime(remainingTime)}
          </div>

          {/* Botão de iniciar (só aparece quando o timer não está rodando) */}
          {!isRunning && (
            <button
              type="button"
              className="start-btn"
              onClick={handleStart}
              aria-label="Iniciar Timer"
            >
              ⏵ Iniciar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
