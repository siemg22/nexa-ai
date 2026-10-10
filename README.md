# NexaAI — AI Assistant Platform

NexaAI is a modern AI assistant web application built with React and Vite, integrated with the OpenRouter API to power AI interactions. It combines an intuitive dashboard with AI chat, content generation, usage tracking, and personalization features.

The project demonstrates frontend development skills, API integration, responsive UI design, and browser-based data persistence.

## ✨ Features

- **AI Chat** — Interact with AI models through the OpenRouter API.
- **AI Content Generator** — A dedicated interface for AI-powered content generation.
- **Interactive Dashboard** — View credits, usage statistics, and available tools.
- **Conversation & Activity History** — Access saved application activity.
- **Usage Tracking** — Monitor credits and generation statistics.
- **Personalized Settings** — Manage profile information and application preferences.
- **Dark Mode** — Switch between light and dark themes.
- **Responsive Design** — Optimized layouts for desktop, tablet, and mobile devices.
- **Local Storage** — Save supported preferences and application data in the browser.

## 🛠️ Tech Stack

- **React** — Component-based UI development
- **JavaScript** — Application logic and interactivity
- **Vite** — Development server and build tooling
- **CSS** — Styling and responsive layouts
- **OpenRouter API** — Access to AI models
- **Browser Local Storage** — Client-side data persistence
- **Git & GitHub** — Version control

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- An OpenRouter API key, if required by your local configuration

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/siemg22/nexa-ai.git
   ```

2. Navigate into the project:

   ```bash
   cd nexa-ai
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure the OpenRouter API credentials according to your project's implementation.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL shown in your terminal.

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the build locally:

```bash
npm run preview
```

## 🔐 API Key Security

NexaAI integrates with OpenRouter to access AI models.

- Never commit API keys, passwords, or access tokens to GitHub.
- Keep local secrets in environment files excluded by `.gitignore`.
- **Important:** Environment variables embedded in a frontend build can be exposed to users. For production deployments, route API requests through a secure backend to protect private API credentials.

## 🗺️ Future Improvements

- Add secure user authentication.
- Implement backend-based user accounts and data persistence.
- Expand usage analytics and credit management.
- Improve error handling and AI response states.
- Add more personalization and AI tools.

## 👨‍💻 Author

**Siem Gebrehiwot**

- GitHub: [@siemg22](https://github.com/siemg22)

## 📄 License

No license has been specified yet. Add a license file if you want to define how others may use, modify, or distribute this project.
