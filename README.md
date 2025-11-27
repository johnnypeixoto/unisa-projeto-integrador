# 🍅 PomoDoroTech

<div align="center">

![PomoDoroTech Logo](https://img.shields.io/badge/Pomodoro-Timer-red?style=for-the-badge&logo=timer)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript)
![Electron](https://img.shields.io/badge/Electron-Desktop-47848F?style=for-the-badge&logo=electron)

**Um aplicativo de produtividade Pomodoro com temática do universo Mario, desenvolvido com React, TypeScript e Electron.**

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Arquitetura](#-arquitetura)
- [Componentes Principais](#-componentes-principais)
- [Customização](#-customização)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

**PomoDoroTech** é um timer Pomodoro desktop que combina produtividade com diversão, inspirado no universo Super Mario. O aplicativo foi desenvolvido para ajudar desenvolvedores e profissionais a gerenciar seu tempo de trabalho usando a técnica Pomodoro (25 minutos de trabalho + 5 minutos de pausa).

### Por que usar?

- ⏱️ **Técnica Pomodoro**: Ciclos de 25 minutos de trabalho focado e 5 minutos de pausa
- 🎮 **Gamificação**: Sons e elementos visuais do universo Mario
- 🌿 **Interface Terminal**: Design inspirado em terminais de desenvolvimento
- 💡 **Mensagens Motivacionais**: Encorajamento durante o trabalho e lembretes de autocuidado nas pausas
- 🚀 **Leve e Rápido**: Aplicativo desktop nativo com Electron

---

## ✨ Funcionalidades

### Temporizador Pomodoro

- ⏰ **25 minutos** de trabalho focado
- ☕ **5 minutos** de pausa para relaxamento
- 🔄 **Alternância automática** entre modos ao finalizar o tempo
- ⏸️ **Controle manual** de pausa e reinício

### Interface Interativa

- 🎨 **Visual de terminal** com sintaxe colorida (estilo Git)
- 🌳 **Branches do Mario**: Nomes criativos de branches inspirados em fases do jogo
- 📝 **Logs motivacionais**: Mensagens rotativas a cada 15 segundos
- 🎯 **Feedback visual**: Estados claros de trabalho e pausa

### Áudio Temático

- 🎵 **Som de início**: Tema clássico do Mario ao iniciar
- 🏆 **Level Complete**: Ao completar um ciclo de trabalho
- 💀 **Game Over**: Ao finalizar uma pausa
- 🪙 **Moeda**: Ao trocar entre modos

### Experiência Desktop

- 🖥️ **Aplicativo nativo** com Electron
- 🎨 **Janela customizada** sem bordas do sistema
- ❌ **Botão de fechar integrado**
- 📐 **Tamanho fixo** (520x520px) otimizado

---

## 🛠️ Tecnologias

### Frontend

- **React 19.2.0** - Biblioteca UI
- **TypeScript 4.9.5** - Tipagem estática
- **CSS3** - Estilização customizada

### Desktop

- **Electron** - Framework para aplicações desktop
- **Node.js** - Runtime JavaScript

### Desenvolvimento

- **React Scripts 5.0.1** - Ferramentas de build
- **Testing Library** - Testes de componentes

### Arquitetura

- **Hooks do React**: `useState`, `useEffect`, `useMemo`, `useCallback`
- **IPC (Inter-Process Communication)**: Comunicação entre processos Electron
- **Context Isolation**: Segurança no Electron

---

## 📁 Estrutura do Projeto

```
pomodoro/
├── public/
│   ├── electron.js          # Processo principal do Electron
│   ├── preload.js           # Script de pré-carregamento (bridge segura)
│   ├── index.html           # HTML base
│   └── manifest.json        # Manifesto da aplicação
├── src/
│   ├── App.tsx              # Componente principal da aplicação
│   ├── App.css              # Estilos da aplicação
│   ├── index.tsx            # Ponto de entrada React
│   ├── custom.d.ts          # Declarações TypeScript customizadas
│   └── assets/              # Recursos (sons, imagens)
│       ├── mario_start.mp3
│       ├── mario_coin.mp3
│       ├── mario_level_complete.mp3
│       ├── mario_game_over.mp3
│       └── pomodorotech.svg
├── build/                   # Build de produção
├── package.json             # Dependências e scripts
├── tsconfig.json            # Configuração TypeScript
└── README.md                # Documentação
```

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

### Passos

1. **Clone o repositório**

   ```bash
   git clone https://github.com/johnnypeixoto/unisa-projeto-integrador.git
   cd pomodoro
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute em modo de desenvolvimento**

   ```bash
   # Inicia o React em modo dev
   npm start

   # Em outro terminal, inicia o Electron
   npm run electron
   ```

4. **Build para produção**
   ```bash
   npm run build
   ```

---

## 💻 Como Usar

### Iniciando um Ciclo Pomodoro

1. **Abra o aplicativo**
2. **Escolha o modo**:
   - ⚡ **Trabalhar**: Ciclo de 25 minutos
   - ⏸ **Pausa**: Ciclo de 5 minutos
3. **Clique em "⏵ Iniciar"**
4. **Foque no trabalho** enquanto vê mensagens motivacionais
5. **Ouça o som** quando o tempo acabar
6. **O app alterna automaticamente** para o próximo modo

### Controles

- **⏵ Iniciar**: Começa o timer
- **⚡ Trabalhar**: Muda para modo trabalho (25 min)
- **⏸ Pausa**: Muda para modo pausa (5 min)
- **✕**: Fecha o aplicativo

### Mensagens

#### Durante o Trabalho 🔥

- "Tá indo bem demais! Continua assim! 🔥"
- "Foco total! Cada minuto conta! ⏱️"
- "Mandando bem! Segue o jogo! 🎯"
- E mais...

#### Durante a Pausa 💧

- "Bora beber uma água! 💧"
- "Hora de se alongar! 🧘"
- "Que tal um lanchinho? 🍪"
- E mais...

---

## 🏗️ Arquitetura

### Processo Principal (Electron)

**Arquivo**: `public/electron.js`

```javascript
// Cria janela principal com configurações customizadas
const mainWindow = new BrowserWindow({
  width: 520,
  height: 520,
  frame: false, // Sem bordas do sistema
  resizable: false, // Tamanho fixo
  titleBarStyle: "hidden", // Barra de título oculta
});
```

**Responsabilidades**:

- Criação e gerenciamento da janela principal
- Configuração de segurança (contextIsolation, nodeIntegration)
- Escuta de eventos IPC do renderer
- Carregamento da aplicação React

### Preload Script

**Arquivo**: `public/preload.js`

```javascript
// Bridge segura entre main e renderer
contextBridge.exposeInMainWorld("electronAPI", {
  closeApp: () => ipcRenderer.send("close-app"),
});
```

**Responsabilidades**:

- Expor APIs seguras para o renderer
- Isolar contexto entre processos
- Comunicação via IPC

### Componente React

**Arquivo**: `src/App.tsx`

Organizado em seções claras:

1. **Constantes**: Tempos e intervalos configuráveis
2. **Estados**: Gerenciamento de estado com `useState`
3. **Áudios**: Objetos de áudio memoizados
4. **Mensagens**: Arrays de mensagens motivacionais
5. **Funções Auxiliares**: `formatTime`, `playSound`, `getRandomBranch`
6. **Handlers**: `handleStart`, `switchMode`
7. **Effects**: Lógica de ciclo de vida
8. **Renderização**: JSX estruturado

---

## 🧩 Componentes Principais

### Estados

```typescript
const [remainingTime, setRemainingTime] = useState(WORK_TIME); // Tempo restante
const [isRunning, setIsRunning] = useState(false); // Timer ativo
const [isBreak, setIsBreak] = useState(false); // Modo pausa
const [encouragement, setEncouragement] = useState(""); // Mensagem atual
const [branchText, setBranchText] = useState(""); // Branch do Mario
```

### Effects

#### 1. Inicialização

Define uma branch aleatória ao montar o componente.

#### 2. Rotação de Mensagens

Alterna mensagens motivacionais a cada 15 segundos durante o timer.

#### 3. Contagem Regressiva

Decrementa o tempo a cada segundo quando o timer está ativo.

#### 4. Transição de Modos

Ao chegar a zero:

- Toca o som apropriado
- Para o timer
- Troca de modo automaticamente
- Seleciona nova branch

### Memoização

```typescript
// Otimização de performance
const audioFiles = useMemo(() => ({ ... }), []);
const cheerMessages = useMemo(() => [...], []);
const marioLevels = useMemo(() => [...], []);
```

### Callbacks

```typescript
// Evita recriação de funções
const formatTime = useCallback((time: number) => { ... }, []);
const playSound = useCallback((audio: HTMLAudioElement) => { ... }, []);
```

---

## 🎨 Customização

### Ajustar Tempos

Em `src/App.tsx`:

```typescript
const WORK_TIME = 25 * 60; // 25 minutos
const BREAK_TIME = 5 * 60; // 5 minutos
const MESSAGE_INTERVAL = 15000; // 15 segundos
```

### Adicionar Mensagens

```typescript
const cheerMessages = useMemo(
  () => [
    "Sua nova mensagem aqui! 🚀",
    // ... outras mensagens
  ],
  []
);
```

### Modificar Branches

```typescript
const marioLevels = useMemo(
  () => [
    "feature/nova-branch 🎯",
    // ... outras branches
  ],
  []
);
```

### Customizar Cores

Em `src/App.css`:

```css
/* Cores do tema */
.blue-text-highlight {
  color: #8be9fd;
}
.green-background {
  background-color: #28c840;
}
/* ... outras cores */
```

---

## 🧪 Testes

```bash
# Executar testes
npm test

# Cobertura de testes
npm test -- --coverage
```

---

## 📦 Build e Distribuição

### Build Web

```bash
npm run build
```

Gera pasta `build/` com arquivos otimizados.

### Build Desktop

```bash
# Primeiro faça o build do React
npm run build

# Depois execute o Electron apontando para o build
npm run electron
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto é parte de um trabalho acadêmico da UNISA.

**Desenvolvido por**: Johnny Peixoto  
**Repositório**: [unisa-projeto-integrador](https://github.com/johnnypeixoto/unisa-projeto-integrador)

---

## 🎮 Créditos

- **Sons**: Baseados no universo Super Mario
- **Conceito**: Técnica Pomodoro
- **Design**: Inspirado em terminais de desenvolvimento

---

<div align="center">

**Feito com ❤️ e ☕ por desenvolvedores, para desenvolvedores**

🍅 **Bora focar e produzir!** 🚀

</div>
