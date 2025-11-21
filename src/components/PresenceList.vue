<script setup>
const props = defineProps({
  users: {
    type: Array,
    default: () => [],
  },
  status: {
    type: String,
    default: 'disconnected',
  },
});
</script>

<template>
  <div class="presence glass-panel">
    <div class="presence-header">
      <p>Status</p>
      <span :class="['status-dot', status]"></span>
      <span class="status-label">{{ status }}</span>
    </div>
    <div class="user-grid">
      <div v-for="user in props.users" :key="user.id" class="user-pill">
        <span class="avatar">{{ user.avatar || '🙂' }}</span>
        <span>{{ user.name }}</span>
      </div>
      <p v-if="!props.users.length" class="empty">No active peers yet.</p>
    </div>
  </div>
</template>

<style scoped>
.presence {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.presence-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--text-muted);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--danger);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.status-dot.connected {
  background: var(--success);
}

.status-label {
  text-transform: none;
  letter-spacing: 0;
}

.user-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.user-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  font-size: 0.9rem;
}

.avatar {
  font-size: 1.1rem;
}

.empty {
  color: var(--text-muted);
  font-size: 0.85rem;
}
</style>

