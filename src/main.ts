import { createApp } from 'vue';
import { router } from './router';
import App from './App.vue';

// load global styles
import './styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

createApp(App).use(router).mount('#app');
