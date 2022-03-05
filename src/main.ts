import { createApp } from 'vue';
import { router } from './router';
import App from './App.vue';

// load bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App).use(router).mount('#app');
