import { io } from 'socket.io-client';
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const AVATARS = ['🛰️', '🪐', '🌙', '🚀', '⚡', '💬', '🔥', '🌈'];

const randomAvatar = () => AVATARS[Math.floor(Math.random() * AVATARS.length)];

const getUUID = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `guest-${Math.random().toString(36).slice(2, 8)}`;
};

const generateIdentity = () => ({
  id: getUUID(),
  name: `Guest-${Math.floor(Math.random() * 999)}`,
  avatar: randomAvatar(),
});

let socket;
let listenersAttached = false;

export function useChat(options = {}) {
  const tokenRef = options.tokenRef;
  const externalIdentity = options.identityRef;

  if (!socket) {
    socket = io(API_URL, {
      autoConnect: false,
      transports: ['websocket'],
    });
  }

  const messages = shallowRef([]);
  const users = shallowRef([]);
  const status = ref(socket.connected ? 'connected' : 'disconnected');
  const identity = externalIdentity || ref(generateIdentity());

  const sendMessage = (text) => {
    if (!text?.trim() || status.value !== 'connected') return;
    socket.emit('chat:message', {
      text: text.trim(),
      avatar: identity.value.avatar,
      token: tokenRef?.value,
    });
  };

  const connect = () => {
    if (socket.connected) return;
    socket.connect();
  };

  const teardown = () => {
    socket.off('connect');
    socket.off('disconnect');
    socket.off('chat:message');
    socket.off('chat:history');
    socket.off('user:list');
    if (socket.connected) {
      socket.disconnect();
    }
    listenersAttached = false;
  };

  const attachListeners = () => {
    if (listenersAttached) return;
    listenersAttached = true;

    const emitJoin = () => {
      socket.emit('user:join', {
        token: tokenRef?.value,
        id: identity.value.id,
        name: identity.value.name,
        avatar: identity.value.avatar,
      });
    };

    socket.on('connect', () => {
      status.value = 'connected';
      emitJoin();
    });

    socket.on('disconnect', () => {
      status.value = 'disconnected';
    });

    socket.on('chat:history', (history) => {
      messages.value = history ?? [];
    });

    socket.on('chat:message', (message) => {
      messages.value = [...messages.value.slice(-80), message];
    });

    socket.on('user:list', (activeUsers) => {
      users.value = activeUsers ?? [];
    });
  };

  const emitJoinUpdate = () => {
    if (socket.connected) {
      socket.emit('user:join', {
        token: tokenRef?.value,
        id: identity.value.id,
        name: identity.value.name,
        avatar: identity.value.avatar,
      });
    }
  };

  const rename = (newName) => {
    if (externalIdentity) return;
    identity.value = { ...identity.value, name: newName.slice(0, 32) };
    emitJoinUpdate();
  };

  const randomizeAvatar = () => {
    if (externalIdentity) return;
    identity.value = { ...identity.value, avatar: randomAvatar() };
    emitJoinUpdate();
  };

  onMounted(() => {
    attachListeners();
    connect();
  });

  onUnmounted(() => {
    teardown();
  });

  if (tokenRef) {
    watch(
      () => tokenRef.value,
      () => {
        emitJoinUpdate();
      }
    );
  }

  if (!externalIdentity) {
    watch(
      () => identity.value,
      () => emitJoinUpdate(),
      { deep: true }
    );
  } else {
    watch(
      () => [externalIdentity.value?.id, externalIdentity.value?.name, externalIdentity.value?.avatar],
      () => emitJoinUpdate(),
      { deep: false }
    );
  }

  return {
    messages,
    users,
    status,
    identity,
    sendMessage,
    rename,
    randomizeAvatar,
  };
}

