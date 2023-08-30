import { createApp } from 'vue';
import { router } from './router';
import App from './App.vue';

// load global styles
import './styles.css';

createApp(App).use(router).mount('#app');
