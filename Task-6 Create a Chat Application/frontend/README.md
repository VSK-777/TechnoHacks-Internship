# VSK Connect AI - Frontend

The frontend of the VSK Connect AI Chat Application is a modern, responsive single-page application built with **React** and **Vite**. It provides a sleek user interface for real-time messaging and interacting with the AI Assistant.

## Tech Stack
- **React 18**
- **Vite** (Build tool)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Socket.IO Client** (Real-time WebSockets)
- **React Icons** (SVG Icons)
- **Axios** (HTTP Client)

## Core File Structure
The `src/` directory is structured as follows:
- `api/`: Axios configurations and API service functions for authentication (`auth.js`), messages (`messages.js`), rooms (`rooms.js`), and AI (`ai.js`).
- `components/`: Reusable React components:
  - `ChatArea.jsx`, `MessageBubble.jsx`, `MessageInput.jsx`: Core messaging interface.
  - `Sidebar.jsx`, `RoomCard.jsx`, `CreateRoomModal.jsx`: Navigation and channel management.
  - `OnlineUsersList.jsx`, `RightPanel.jsx`: User status and supplementary information.
  - `AIAssistant.jsx`, `AIMessage.jsx`, `AIFloatingButton.jsx`: AI-specific UI components.
  - `Avatar.jsx`, `EmojiPicker.jsx`, `TypingIndicator.jsx`: Visual enhancements.
- `contexts/`: React Context providers for global state management:
  - `AuthContext.jsx`: Manages user login state and JWT tokens.
  - `ChatContext.jsx`: Manages the active room and conversation state.
  - `SocketContext.jsx`: Manages the global Socket.IO connection.
- `hooks/`: Custom React hooks (`useAuth`, `useChat`, `useSocket`, `useAI`) to consume contexts easily.
- `pages/`: High-level page layouts (`LoginPage.jsx`, `RegisterPage.jsx`, `ChatPage.jsx`).
- `utils/`: Constants and helper functions.

## Setup and Execution
1. Ensure you have **Node.js** installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure the backend server is running (defaults to `http://localhost:8080` for API and `http://localhost:9092` for sockets).
4. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`.
5. For a production build, run:
   ```bash
   npm run build
   ```
