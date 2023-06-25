<script setup>
import { computed } from 'vue'
import { useStore } from '../store/user';
import { usePokemonStore } from '../store/pokemonStore';
import { useGlobalStore } from '../store/globalStore';

const store = useStore();
const pokemonStore = usePokemonStore()
const globalStore = useGlobalStore()
const name = computed(() => {
    return store.getName()
})
const logout = () => {
    store.setUserData("", "")
    pokemonStore.getListPokemonFiltered()
}
</script>

<template>
    <router-link to="/profile">
        <span v-if="store.getToken()">{{ name }}</span>
    </router-link>
    <button v-if="!store.getToken()" class="login-button" @click="globalStore.toogleShowLoginModal">Login</button>
    <button v-if="store.getToken()" class="logout-button" @click="logout">Logout</button>
</template>

<style scoped>
a {
    cursor: pointer;
}

.header .user {
    display: flex;
    color: #2c3e50;
    font-weight: bold;
    text-decoration: none;
}

.header .login-button,
.header .logout-button {
    background: #2c3e50;
    color: #fff;
    border: 0;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 15px;
}</style>