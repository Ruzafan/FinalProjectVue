<script setup>
import Login from './Login.vue'
</script>

<template>
  <header class="header">
    <div class="header__left">
      <router-link to="/">
        <img class="logo" src="../assets/logo.png" alt="Logo">
      </router-link>
      <router-link to="/">
        <h1 class="title">Pokedex</h1>
      </router-link>

    </div>
    <div class="header__right">
      <Login @showLogin="$emit('showLogin')"></Login>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
}
.header .left {
  display: flex;
  align-items: center;
}
.header .right {
  display: flex;
  align-items: center;
}
.header .logo {
  max-height: 50px;
}
.header .app-name {
  margin-left: 25px;
  font-weight: bold;
  font-size: 20px;
}

.header:deep(a){
  text-decoration: none;
}
.header .header__left:deep(a){
  cursor: default;
  text-decoration: none;
}
</style>