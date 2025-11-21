<script setup>
import { computed } from 'vue';

const props = defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
  currentUser: {
    type: Object,
    default: () => ({}),
  },
});

const orderedMessages = computed(() =>
  props.messages.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
);
</script>

<template>
  <div class="message-list glass-panel">
    <TransitionGroup name="message">
      <article v-for="message in orderedMessages" :key="message.id" class="message-row" :class="{ self: message.sender === currentUser.name }">
        <div class="meta">
          <span class="avatar">{{ message.avatar || '💬' }}</span>
          <strong>{{ message.sender }}</strong>
          <time>{{ new Date(message.timestamp).toLocaleTimeString() }}</time>
        </div>
        <p>{{ message.text }}</p>
      </article>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.message-list {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  max-height: calc(100vh - 320px);
  overflow-y: auto;
}

.message-row {
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  background: rgba(10, 12, 17, 0.45);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.message-row.self {
  border-color: var(--accent);
  background: rgba(124, 111, 255, 0.1);
}

.meta {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.avatar {
  font-size: 1.2rem;
}

.message-enter-active,
.message-leave-active {
  transition: all 0.25s ease;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>

