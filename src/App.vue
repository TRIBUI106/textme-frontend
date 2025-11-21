<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useAuth } from './composables/useAuth';

const year = new Date().getFullYear();
const auth = useAuth();
const router = useRouter();

const handleLogout = () => {
  auth.logout();
  router.push({ name: 'login' });
};
</script>

<template>
  <div class="app-shell">
    <header class="app-header glass-panel fade-slide-up">
      <RouterLink to="/" class="brand">
        <span>text-me</span>
        <small>crafted by yeumedevs</small>
      </RouterLink>

      <nav>
        <RouterLink to="/">Overview</RouterLink>
        <RouterLink to="/chat">Realtime Chat</RouterLink>
        <a href="https://github.com/yeumedevs" target="_blank" rel="noreferrer">
          Owner
        </a>
      </nav>
      <div class="auth-actions">
        <RouterLink v-if="!auth.isAuthenticated" class="pill ghost" to="/login">Login</RouterLink>
        <div v-else class="user-chip">
          <div class="avatar-circle">
            <img v-if="auth.user?.avatar" :src="auth.user.avatar" alt="avatar" />
            <span v-else>{{ auth.user?.name?.charAt(0) ?? '🙂' }}</span>
          </div>
          <div class="user-meta">
            <strong>{{ auth.user?.name }}</strong>
            <small>{{ auth.user?.email }}</small>
          </div>
          <button type="button" @click="handleLogout">Logout</button>
        </div>
      </div>
    </header>

    <main>
      <RouterView />
    </main>

    <footer class="app-footer glass-panel">
      <p>Owner: yeumedevs · CEO: chez1s</p>
      <p>Realtime chat demo &copy; {{ year }}</p>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  padding: 1.5rem clamp(1.5rem, 4vw, 4rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.app-header,
.app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.75rem;
  gap: 1rem;
}

.brand {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.brand small {
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0;
}

nav {
  display: flex;
  gap: 1rem;
  font-weight: 500;
}

nav a {
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  color: var(--text-muted);
}

nav a.router-link-active {
  border-color: var(--accent);
  color: #fff;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

main {
  flex: 1;
  display: flex;
}

.app-footer {
  font-size: 0.85rem;
  color: var(--text-muted);
  flex-wrap: wrap;
}

.auth-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pill {
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: #fff;
  background: transparent;
}

.pill.ghost {
  color: var(--text-muted);
}

.user-chip {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.35rem 0.75rem 0.35rem 0.35rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(5, 7, 9, 0.4);
}

.avatar-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  font-weight: 600;
}

.avatar-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.user-meta small {
  color: var(--text-muted);
}

.user-chip button {
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    align-items: flex-start;
  }

  nav {
    width: 100%;
    flex-wrap: wrap;
  }
}
</style>
