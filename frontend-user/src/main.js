import './assets/style.css';
import './assets/header.png';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import vue3GoogleLogin from 'vue3-google-login';

const app = createApp(App);

const pinia = createPinia();
pinia.use(() => { return {$toast: useToast()} });
app.use(pinia);

app.use(vue3GoogleLogin, {
  clientId: '153352048809-6osqpek6vkjn8afq6b7qb9i7oc26jd7d.apps.googleusercontent.com'
});
app.use(router);

app.mount('#app');