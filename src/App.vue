<script setup>
import {ref} from 'vue'
import HeaderMain from './components/HeaderMain.vue'
import LoginForm from './components/LoginForm.vue'
import MiniModalLayer from './components/MiniModalLayer.vue'
import {useRouter} from 'vue-router'

const showModal = ref(false);
const router = useRouter();


const login = () => {
  toggleForm();
  router.push('/profile');
};

const toggleForm = () => {
  showModal.value = !showModal.value;
};

</script>

<template>
  <HeaderMain @showLogin="toggleForm"></HeaderMain>
  <div>
    <router-view></router-view>
    <MiniModalLayer v-show="showModal" @close-modal="toggleForm">
      <template v-slot:header>
        <h2>Login</h2>
      </template>
      <template v-slot:body>
        <LoginForm @login="login"></LoginForm>
      </template>
    </MiniModalLayer>
  </div>
</template>

<style scoped>
body {
  padding: 0;
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}</style>
