<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  clientId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['success', 'error']);

const buttonRef = ref(null);
const ready = ref(false);

const loadGoogleSdk = () =>
  new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return reject(new Error('Google SDK unavailable on server'));
    }
    if (window.google?.accounts?.id) return resolve(window.google);
    const existing = document.getElementById('google-identity');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google));
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.id = 'google-identity';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = reject;
    document.head.appendChild(script);
  });

const handleCredential = (response) => {
  if (response?.credential) {
    emit('success', response.credential);
  } else {
    emit('error', new Error('No credential provided'));
  }
};

onMounted(async () => {
  try {
    const google = await loadGoogleSdk();
    google.accounts.id.initialize({
      client_id: props.clientId,
      callback: handleCredential,
    });
    if (buttonRef.value) {
      google.accounts.id.renderButton(buttonRef.value, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        width: 320,
      });
      ready.value = true;
    }
  } catch (err) {
    emit('error', err);
  }
});
</script>

<template>
  <div class="google-login">
    <div v-if="ready" ref="buttonRef"></div>
    <button v-else class="fallback" type="button" disabled>Loading Google...</button>
  </div>
</template>

<style scoped>
.google-login {
  display: flex;
  justify-content: center;
}

.fallback {
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
}
</style>

