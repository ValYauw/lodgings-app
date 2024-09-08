import './assets/style.css';
import './assets/header.png';

import { createApp } from 'vue';
import App from './App.vue';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import vue3GoogleLogin from 'vue3-google-login'

console.log("HELLO");

const app = createApp(App);
app.use(ToastPlugin);
app.use(vue3GoogleLogin, {
  clientId: '153352048809-6osqpek6vkjn8afq6b7qb9i7oc26jd7d.apps.googleusercontent.com'
})
app.mount('#app');