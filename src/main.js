import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import PokemonDetail from './components/PokemonDetail.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory  } from 'vue-router'
import './assets/logo.png'
import './assets/delete-button.svg'
import './assets/close-button.svg'


const routes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/pokemon/:id', component: PokemonDetail },
  ]
  const history = createWebHistory();
  const router = createRouter({
    history,
    routes
  });
const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
