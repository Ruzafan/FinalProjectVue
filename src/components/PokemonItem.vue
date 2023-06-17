<script setup>
import { Pokemon } from "../models/pokemon.js"
import { defineProps, ref } from 'vue';
import {useRouter} from 'vue-router'
import { useStore } from '../store/user'

  const props = defineProps({pokemon: Pokemon})
  const router = useRouter()
  const store = useStore()
  const gotoDetail = (id) => {
    if(store.getToken())
    {
        router.replace({path:"/pokemon/"+id})
    }
  }
  var isLogged = ref(!!store.getToken())
</script>

<template>
    
    <div :class="['pokemon', { 'pointer': isLogged }, { 'captured': pokemon.captured } ]" @click="gotoDetail(pokemon.id)">
      <button class="delete-pokemon pokemon-item__delete" @click="$emit('delete-pokemon',pokemon.id)">
            <img src="../assets/delete-button.svg" alt="Delete pokemon" />
        </button>  
      <div class="pokemon__image">
            <img :src="pokemon.sprite" :alt="`${pokemon.name} image`" />
        </div>
        <div class="pokemon__info">
            <h2 class="pokemon__name">{{ pokemon.name }}</h2>
        </div>
        <p class="pokemon__description">{{ pokemon.description }}</p>
        <div class="pokemon__types">
            <span v-for="poketype in pokemon.types" :class="['pokemon__type',poketype.toLowerCase()]"> {{ poketype }}</span>
        </div>
        <div class="pokemon__stats">
            <p class="pokemon__stat"><b class="pokemon__stat-name">Height:</b> <span class="pokemon__stat-value">{{ pokemon.height }}</span></p>
            <p class="pokemon__stat"><b class="pokemon__stat-name">Weight:</b> <span class="pokemon__stat-value">{{ pokemon.weight }}</span></p>
        </div>
    </div>

</template>

<style scoped>
.pokemon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  max-width: 400px;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
}
.pokemon.pointer{
  cursor: pointer;
}
.pokemon.captured {
  background-color: #f0f0f0;
}
.pokemon__image {
  width: 100%;
  max-width: 200px;
  height: 100%;
  max-height: 200px;
  margin-bottom: 1rem;
}
.pokemon__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.pokemon__info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pokemon__name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
  text-decoration: none;
}
.pokemon__description {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
}
.pokemon__types {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.pokemon__type {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
}
.pokemon__type.fire {
  background-color: #f08030;
  color: #fff;
}
.pokemon__type.water {
  background-color: #6890f0;
  color: #fff;
}
.pokemon__type.grass {
  background-color: #78c850;
  color: #fff;
}
.pokemon__type.electric {
  background-color: #f8d030;
  color: #fff;
}
.pokemon__type.ice {
  background-color: #98d8d8;
  color: #fff;
}
.pokemon__type.fighting {
  background-color: #c03028;
  color: #fff;
}
.pokemon__type.poison {
  background-color: #a040a0;
  color: #fff;
}
.pokemon__type.ground {
  background-color: #e0c068;
  color: #fff;
}
.pokemon__type.flying {
  background-color: #a890f0;
  color: #fff;
}
.pokemon__type.psychic {
  background-color: #f85888;
  color: #fff;
}
.pokemon__type.bug {
  background-color: #a8b820;
  color: #fff;
}
.pokemon__type.rock {
  background-color: #b8a038;
  color: #fff;
}
.pokemon__type.ghost {
  background-color: #705898;
  color: #fff;
}
.pokemon__type.dragon {
  background-color: #7038f8;
  color: #fff;
}
.pokemon__type.dark {
  background-color: #705848;
  color: #fff;
}
.pokemon__type.steel {
  background-color: #b8b8d0;
  color: #fff;
}
.pokemon__type.fairy {
  background-color: #ee99ac;
  color: #fff;
}
.pokemon__stats {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pokemon__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pokemon__stat-name {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}
.pokemon__stat-value {
  font-size: 1rem;
  font-weight: 700;
}

.delete-pokemon {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.delete-pokemon img {
  width: 20px;
}


</style>