<script setup>
import { defineEmits, computed } from 'vue'
import { useStore } from '../store/user';

const emit = defineEmits(['showLogin'])
const store = useStore();

const hasToken = computed(() => {

    let token = store.getToken()
    return !!token
})
const name = computed(() => {
    return store.getName()
})
const logout = () => {
    store.setUserData("", "")
}
</script>

<template>
    <router-link to="/profile">
        <span v-if="hasToken">{{ name }}</span>
    </router-link>
    <button v-if="!hasToken" class="login-button" @click="$emit('showLogin')">Login</button>
    <button v-if="hasToken" class="logout-button" @click="logout">Logout</button>
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