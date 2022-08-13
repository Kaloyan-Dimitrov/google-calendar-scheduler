import {
	createApp
} from 'vue';
import {
	createPinia
} from 'pinia';
import {
	Quasar
} from 'quasar';
import App from './App.vue';
import router from './router';

import './assets/main.css';

import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import '@quasar/extras/eva-icons/eva-icons.css';

import 'quasar/src/css/index.sass';

const pinia = createPinia();
const app = createApp(App);

app.use(Quasar, {
	plugins: {}
});
app.use(pinia);
app.use(router);

app.mount('#app');