# Frontend - Text Me

Vue 3 + Vite frontend với Vue Router, Socket.io client, và Google Identity integration.

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Environment Setup](#-environment-setup)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Scripts](#-scripts)
- [Deployment](#-deployment)

---

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Create .env file
copy example.env .env    # Windows
cp example.env .env      # macOS/Linux

# Edit .env with your values (see below)

# Run development server
bun run dev
```

Frontend runs on http://localhost:5173 (default)

---

## ⚙️ Environment Setup

### Step 1: Create `.env` file

```bash
# Windows
copy example.env .env

# macOS/Linux
cp example.env .env
```

### Step 2: Configure Variables

Open `frontend/.env` and set:

```env
VITE_API_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

#### Variable Explanations

- **`VITE_API_URL`**: Backend API URL
  - Development: `http://localhost:4000`
  - Production: `https://api.yourdomain.com`
  - ⚠️ Must match backend `PORT` and `CLIENT_ORIGIN`

- **`VITE_GOOGLE_CLIENT_ID`**: Google OAuth Client ID
  - **Must match** `GOOGLE_CLIENT_ID` in backend `.env`
  - Get from [Google Cloud Console](https://console.cloud.google.com/)
  - Format: `xxxxx.apps.googleusercontent.com`
  - Can leave empty if not using Google login

---

## ✨ Features

- **Vue 3** with Composition API
- **Vue Router** for navigation
- **Socket.io Client** for realtime chat
- **Google Identity** button for OAuth login
- **Composables** pattern for state management
- **Animated UI** with CSS transitions
- **Responsive design** for mobile and desktop

### Pages

- **Landing Page** (`/`) - Overview and navigation
- **Login Page** (`/login`) - Authentication (email/password + Google)
- **Chat Page** (`/chat`) - Realtime chat room

### Components

- `MessageList` - Displays chat messages
- `MessageComposer` - Input for sending messages
- `PresenceList` - Shows online users
- `GoogleLoginButton` - Google OAuth button

### Composables

- `useAuth` - Authentication state and methods
- `useChat` - Chat functionality and socket connection

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── assets/          # CSS and static assets
│   ├── components/      # Vue components
│   ├── composables/     # Vue composables (useAuth, useChat)
│   ├── router/          # Vue Router configuration
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   └── main.js          # Entry point
├── public/              # Static files
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

---

## 📜 Scripts

```bash
# Development server (with hot reload)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

---

## 🚢 Deployment

### Build for Production

```bash
bun run build
```

Output: `frontend/dist/` directory

### Deploy to Static Hosting

#### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL`
   - `VITE_GOOGLE_CLIENT_ID`

#### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Build: `bun run build`
3. Deploy: `netlify deploy --prod --dir=dist`
4. Set environment variables in Netlify dashboard

#### Other Platforms

- **Build command**: `bun run build`
- **Output directory**: `dist`
- **Environment variables**: Set `VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID` on platform

### Production Checklist

- [ ] Updated `VITE_API_URL` to production backend URL
- [ ] Set `VITE_GOOGLE_CLIENT_ID` (must match backend)
- [ ] Added production domain to Google OAuth Authorized origins
- [ ] Environment variables set on hosting platform
- [ ] Tested authentication flow
- [ ] Tested chat functionality

---

## 🐛 Troubleshooting

### "Invalid Google credential"
- Verify `VITE_GOOGLE_CLIENT_ID` matches backend `GOOGLE_CLIENT_ID`
- Check domain is added to Google OAuth Authorized origins
- Ensure no extra whitespace in `.env` file

### Cannot connect to backend
- Check `VITE_API_URL` matches backend URL
- Verify backend is running
- Check CORS settings in backend (must include frontend URL)

### Build errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && bun install`
- Check Node.js/Bun version compatibility
- Verify all environment variables are set

### Socket connection fails
- Verify backend is running
- Check `VITE_API_URL` is correct
- Check browser console for CORS errors
- Verify backend `CLIENT_ORIGIN` includes frontend URL

---

## 📦 Dependencies

- `vue` - Vue 3 framework
- `vue-router` - Routing
- `socket.io-client` - Realtime communication
- `@vueuse/core` - Vue composition utilities

### Dev Dependencies

- `vite` - Build tool
- `@vitejs/plugin-vue` - Vite Vue plugin

---

## 🎨 Styling

- Custom CSS with CSS variables for theming
- Glassmorphism effects
- Smooth animations and transitions
- Responsive breakpoints

### CSS Variables

Defined in `src/assets/base.css`:
- `--accent`, `--accent-2` - Primary colors
- `--text-muted` - Secondary text color
- `--border` - Border color
- `--bg` - Background color

---

**Frontend for Text Me - Built by yeumedevs**
