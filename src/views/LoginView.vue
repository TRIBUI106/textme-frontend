<script setup>
import { reactive, ref, watch } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import GoogleLoginButton from '../components/GoogleLoginButton.vue';

const auth = useAuth();
const router = useRouter();
const route = useRoute();
const mode = ref('login');

watch(
  () => mode.value,
  () => {
    auth.error.value = null;
  }
);

const loginForm = reactive({
  email: '',
  password: '',
});

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
});

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const redirectAfterAuth = () => {
  const target = route.query.redirect || '/chat';
  router.push(target);
};

const handleLogin = async () => {
  try {
    await auth.login(loginForm);
    redirectAfterAuth();
  } catch (error) {
    console.error(error);
  }
};

const handleRegister = async () => {
  try {
    await auth.register(registerForm);
    redirectAfterAuth();
  } catch (error) {
    console.error(error);
  }
};

const handleGoogleSuccess = async (credential) => {
  try {
    await auth.loginWithGoogle(credential);
    redirectAfterAuth();
  } catch (error) {
    console.error(error);
  }
};

const handleGoogleError = (err) => {
  auth.error.value = err?.message || 'Google login failed';
};
</script>

<template>
  <section class="auth-wrapper">
    <div class="auth-card glass-panel fade-slide-up">
      <p class="eyebrow">Secure portal</p>
      <h1>Sign in to Text Me</h1>
      <p class="lede">Chat as yourself and keep your identity synced across devices.</p>

      <div class="tabs">
        <button :class="{ active: mode === 'login' }" @click="mode = 'login'">Login</button>
        <button :class="{ active: mode === 'register' }" @click="mode = 'register'">Register</button>
      </div>

      <form v-if="mode === 'login'" class="form" @submit.prevent="handleLogin">
        <label>
          Email
          <input v-model="loginForm.email" type="email" autocomplete="email" required />
        </label>
        <label>
          Password
          <input v-model="loginForm.password" type="password" autocomplete="current-password" required />
        </label>
        <button class="primary" type="submit" :disabled="auth.loading">Login</button>
      </form>

      <form v-else class="form" @submit.prevent="handleRegister">
        <label>
          Name
          <input v-model="registerForm.name" type="text" autocomplete="name" required />
        </label>
        <label>
          Email
          <input v-model="registerForm.email" type="email" autocomplete="email" required />
        </label>
        <label>
          Password
          <input v-model="registerForm.password" type="password" autocomplete="new-password" minlength="6" required />
        </label>
        <button class="primary" type="submit" :disabled="auth.loading">Create account</button>
      </form>

      <p v-if="auth.error" class="error">{{ auth.error }}</p>

      <div v-if="clientId" class="divider">
        <span>OR</span>
      </div>
      <GoogleLoginButton
        v-if="clientId"
        :client-id="clientId"
        @success="handleGoogleSuccess"
        @error="handleGoogleError"
      />
      <p v-else class="hint">Set VITE_GOOGLE_CLIENT_ID to enable Google login.</p>

      <RouterLink class="ghost-link" to="/">← Back to overview</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.auth-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.auth-card {
  max-width: 420px;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.3rem;
  background: rgba(255, 255, 255, 0.02);
}

.tabs button {
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  background: transparent;
  color: var(--text-muted);
  font-weight: 600;
  cursor: pointer;
}

.tabs button.active {
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #050709;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

input {
  border-radius: 0.9rem;
  border: 1px solid var(--border);
  background: rgba(5, 7, 9, 0.6);
  color: #fff;
  padding: 0.7rem 1rem;
}

button.primary {
  margin-top: 0.5rem;
  padding: 0.85rem 1rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #050709;
  cursor: pointer;
}

.divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.error {
  color: var(--danger);
  font-size: 0.9rem;
}

.ghost-link {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 1rem;
}

.hint {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.85rem;
}
</style>

