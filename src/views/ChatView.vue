<script setup>
import { ref, watch } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useChat } from '../composables/useChat';
import PresenceList from '../components/PresenceList.vue';
import MessageList from '../components/MessageList.vue';
import MessageComposer from '../components/MessageComposer.vue';

const auth = useAuth();

const randomId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `guest-${Math.random().toString(36).slice(2, 8)}`;
};

const fallbackIdentity = () => ({
  id: randomId(),
  name: 'Guest',
  avatar: '🙂',
});

const identityRef = ref(fallbackIdentity());
const displayName = ref(identityRef.value.name);

watch(
  () => auth.user.value,
  (next) => {
    if (next) {
      identityRef.value = {
        ...identityRef.value,
        id: next.id,
        name: next.name || identityRef.value.name,
        avatar: next.avatar || identityRef.value.avatar,
      };
    } else {
      identityRef.value = fallbackIdentity();
    }
    displayName.value = identityRef.value.name;
  },
  { immediate: true }
);

const { messages, users, status, identity, sendMessage } = useChat({
  tokenRef: auth.token,
  identityRef,
});

const handleSend = (text) => {
  sendMessage(text);
};

const updateName = () => {
  if (!displayName.value.trim()) return;
  identityRef.value = { ...identityRef.value, name: displayName.value.trim() };
};

const diceAvatars = ['🛰️', '🪐', '🌙', '🚀', '⚡', '💬', '🔥', '🌈'];
const randomizeAvatar = () => {
  const choice = diceAvatars[Math.floor(Math.random() * diceAvatars.length)];
  identityRef.value = { ...identityRef.value, avatar: choice };
};
</script>

<template>
  <section class="chat-layout">
    <aside class="sidebar">
      <div class="identity glass-panel">
        <p class="eyebrow">You</p>
        <div class="identity-row">
          <span class="avatar">{{ identity.avatar }}</span>
          <input v-model="displayName" maxlength="32" @change="updateName" />
          <button type="button" @click="randomizeAvatar">🎲</button>
        </div>
        <p class="small">Connection: {{ status }}</p>
      </div>

      <PresenceList :users="users" :status="status" />
    </aside>

    <div class="chat-panel">
      <MessageList :messages="messages" :current-user="identity" />
      <MessageComposer :disabled="status !== 'connected'" @send="handleSend" />
    </div>
  </section>
</template>

<style scoped>
.chat-layout {
  width: 100%;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1rem;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.identity {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.eyebrow {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--accent-2);
}

.identity-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.identity-row input {
  flex: 1;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  color: #fff;
  padding: 0.4rem 0.8rem;
}

.identity-row button {
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  width: 36px;
  height: 36px;
  cursor: pointer;
}

.avatar {
  font-size: 1.5rem;
}

.small {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.chat-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 900px) {
  .chat-layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .identity,
  .presence {
    flex: 1;
  }
}
</style>

