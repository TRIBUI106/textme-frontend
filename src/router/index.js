import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '../views/LandingView.vue';
import ChatView from '../views/ChatView.vue';
import LoginView from '../views/LoginView.vue';
import { authTokenRef } from '../composables/useAuth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingView,
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !authTokenRef.value) {
    return next({ name: 'login', query: { redirect: to.fullPath } });
  }
  if (to.name === 'login' && authTokenRef.value) {
    return next({ name: 'chat' });
  }
  return next();
});

export default router;

