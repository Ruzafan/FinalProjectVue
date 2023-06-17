<script setup>
import PokemonItem from './PokemonItem.vue';
import { defineProps } from 'vue';
const props = defineProps({
    pokemons: Array
})
</script>

<template>
    <div v-if="pokemons" class="pokemon-list">
        <PokemonItem v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon"  />
    </div>
    <div v-else>
        No pokemons to display
    </div>
</template>
  
<style scoped>
.pokemon-list {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
}

</style>