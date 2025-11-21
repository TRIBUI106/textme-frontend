<script setup>
import { ref } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['send']);

const input = ref('');

const handleSend = () => {
  if (!input.value.trim() || props.disabled) return;
  emit('send', input.value.trim());
  input.value = '';
};

const handleKey = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleSend();
  }
};
</script>

<template>
  <div class="composer glass-panel">
    <textarea
      v-model="input"
      placeholder="Type a message..."
      :disabled="props.disabled"
      rows="2"
      @keydown="handleKey"
    />
    <button class="send" type="button" :disabled="props.disabled" @click="handleSend">
      Send
    </button>
  </div>
</template>

<style scoped>
.composer {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  align-items: center;
}

textarea {
  flex: 1;
  border-radius: 1rem;
  border: 1px solid var(--border);
  background: rgba(5, 7, 9, 0.6);
  color: #fff;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  resize: none;
  min-height: 64px;
}

.send {
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #050709;
  cursor: pointer;
}

button:disabled,
textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

