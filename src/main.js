import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../public/tailwind.css'

createApp(App).use(router).mount('#app')
