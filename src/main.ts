import { createApp } from 'vue';
import { router } from './router';
import App from './App.vue';

// load bootstrap files
import './styles.scss';
import 'bootstrap';

createApp(App).use(router).mount('#app');
