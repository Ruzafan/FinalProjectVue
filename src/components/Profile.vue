<script setup>
import { useStore } from '../store/user'
import {  useRouter } from 'vue-router'
import axios from 'axios';
import {ref} from 'vue'
let store = useStore()
let token = store.getToken()
if(!token) {
    const router = useRouter()
    router.replace({path: '/'})
}
let user = ref(null)

let config = {
        headers: {
        authorization: token
        }
    }
axios.get("http://localhost:3000/user",config)
        .then((res) => {
            res = res.data.data
            console.log(res)
            user.value = {}
            user.value.img = res.avatar
            user.value.name = res.name + " " + res.lastName
            user.value.city = res.city 
            user.value.country = res.country 
            user.value.email = res.email 
            user.value.phone = res.phone 
            user.value.address = res.address
        })
        .catch((err) => console.log(err));
</script>

<template>
    <div class="profile__info" v-if="user">
        <div class="profile__image">
            <img :src="user.img" alt="profile image" />
        </div>
        <div class="profile__data">
            <p class="profile__name">{{ user.name }}</p>
            <p class="profile__city">{{ user.city }}</p>
            <p class="profile__country">{{ user.country }}</p>
            <p class="profile__email">{{ user.email }}</p>
            <p class="profile__phone">{{ user.phone }}</p>
            <p class="profile__address">{{ user.address }}</p>
        </div>
    </div>
</template>

<style scoped>

.profile__info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
.profile__image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 50px;
}
.profile__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.profile__data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.profile__name {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}
.profile__city,
.profile__country,
.profile__email,
.profile__phone,
.profile__address {
  font-size: 20px;
  margin-bottom: 10px;
}

</style>