<script setup>
import { defineEmits, ref } from 'vue'
import axios from "axios";
import { useStore } from '../store/user'
import FormTextItem from './FormItems/FormTextItem.vue'
var email = ref("");
var pwd = ref("");
var displayError = ref(false)
const emit = defineEmits(['login'])
var submitForm = async () => {
    if (email && pwd) {
        displayError.value = false;
        let login = {
        "email": email.value,
        "password": pwd.value
      }
        let response = await axios.post("http://localhost:3000/login", login)
        if(!response.data.error)
        {
            let store = useStore()
            store.setUserData(response.data.data.name,response.data.data.tokenId)
            email.value = ""
            pwd.value = ""
            emit('login')
        }else{
            displayError.value = true;
        }
        
    } else {
        displayError.value = true;
    }
}
</script>
<template>
    <div class="login-form">
        <form class="login-form__form" @submit.prevent="submitForm">

            <FormTextItem v-model="email" fieldName="Email" /> 
            <FormTextItem v-model="pwd" fieldName="Password" />

            <div v-if=displayError>
                <span>An error has ocurred</span>
            </div>
            <div class="login-form__form-group">
                <button type="submit" class="login-form__submit">Login</button>
            </div>
        </form>
    </div>
</template>
<style>
.login-form .login-form__form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
}


.login-form .login-form__form-group {
    margin-bottom: 20px;
    width: 50%;
    display: flex;
    flex-direction: column;
}


.login-form .form__form-group label {
    display: block;
    margin-bottom: 10px;
    text-align: left;
    font-size: 14px;
}

.form__form-group input{
    width: 90%;
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    text-align: left;
}

.login-form .login-form__form-group input:focus{
    border-color: #000;
}

.login-form .login-form__submit {
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    min-width: 100px;
    background-color: #4caf50;
    color: #fff;
}

.login-form .login-form__submit:hover {
    background-color: #43a047;
}
</style>