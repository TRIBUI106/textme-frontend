<script setup>
import { RouterLink } from 'vue-router';

const highlights = [
  {
    title: 'Realtime messaging',
    body: 'Socket.io powered transport ensures sub-second delivery.',
    stat: '<150ms',
  },
  {
    title: 'Ambient presence',
    body: 'Live roster shows who is active and reacting.',
    stat: 'Live',
  },
  {
    title: 'Owner DNA',
    body: 'Built in-house by yeumedevs.',
    stat: '100% indie',
  },
];
</script>

<template>
  <section class="landing">
    <div class="hero glass-panel fade-slide-up">
      <p class="eyebrow">Owner · yeumedevs · chez1s</p>
      <h1>Text Me is a realtime chat playground for bold product teams.</h1>
      <p class="lede">
        Crafted with Vue 3 + Vite on the frontend and a Node/Express socket
        hub on the backend. It’s lightweight, animated, and ready to plug into
        your roadmap.
      </p>
      <div class="actions">
        <RouterLink to="/chat" class="cta primary">Join the chat</RouterLink>
        <a
          class="cta ghost"
          href="https://github.com/yeumedevs"
          rel="noreferrer"
          target="_blank"
        >
          Meet the owner
        </a>
      </div>
    </div>

    <div class="grid">
      <article v-for="card in highlights" :key="card.title" class="card glass-panel">
        <p class="stat">{{ card.stat }}</p>
        <h3>{{ card.title }}</h3>
        <p>{{ card.body }}</p>
      </article>

      <article class="card glass-panel manifesto">
        <p class="eyebrow">Why Text Me</p>
        <p>
          We obsess over clarity, latency, and playful motion. Every detail—from
          the glowing cursors to the adaptive typography—is tuned to make
          conversation feel alive.
        </p>
        <RouterLink to="/chat" class="cta-link">See it in action →</RouterLink>
      </article>
    </div>
  </section>
</template>

<style scoped>
.landing {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.hero {
  padding: clamp(1.5rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% -10%, rgba(124, 111, 255, 0.4), transparent 50%);
  opacity: 0.7;
  pointer-events: none;
}

.eyebrow {
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: var(--accent-2);
}

.lede {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--text-muted);
  max-width: 60ch;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.cta {
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  border: 1px solid var(--border);
  transition: transform 0.2s ease, background 0.2s ease;
}

.cta.primary {
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #020202;
  border: none;
  box-shadow: 0 15px 40px rgba(124, 111, 255, 0.35);
}

.cta.ghost:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.card {
  padding: 1.25rem;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.card h3 {
  margin: 0;
}

.card p {
  margin: 0;
  color: var(--text-muted);
}

.stat {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #fff;
}

.manifesto {
  grid-column: span 2;
}

.cta-link {
  margin-top: auto;
  color: var(--accent-2);
  font-weight: 600;
}

@media (max-width: 768px) {
  .manifesto {
    grid-column: span 1;
  }
}
</style>

