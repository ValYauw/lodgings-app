import { createRouter, createWebHistory } from 'vue-router';
import { useSiteVarStore } from '@/stores/sitevar';
import jwt_decode from "jwt-decode";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/lodgings',
      name: 'lodgings',
      component: () => import('../views/LodgingsView.vue')
    },
    {
      path: '/lodgings/:id',
      name: 'lodging',
      component: () => import('../views/DetailView.vue'),
      props: true
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: () => import('../views/BookmarkView.vue')
    },
  ]
})

router.beforeEach((to, from) => {
  const restrictedPaths = {
    bookmarks: true
  };
  const store = useSiteVarStore();

  const token = localStorage.getItem("access_token");

  let isAuthenticated = false;
  if (token) {
    const decodedToken = jwt_decode(token);
    isAuthenticated = decodedToken && (decodedToken.exp * 1000) > new Date().getTime();
  }
  if (token && !isAuthenticated) {
    store.$toast.open({
      message: 'Token has expired',
      type: 'error'
    })
    store.logout();
    return { name: 'home' }
  }
  if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    store.$toast.open({
      message: 'Already signed in',
      type: 'error'
    })
    return { name: 'home' }
  }
  if (!isAuthenticated && restrictedPaths[to.name]) {
    store.$toast.open({
      message: 'You must login first',
      type: 'error'
    })
    return { name: 'home' }
  };
});

export default router;