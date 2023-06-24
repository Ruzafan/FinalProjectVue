<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from '../store/user';
import SearchBar from './SearchBar.vue'
import FilterBar from './FilterBar.vue'
import PokemonList from './PokemonList.vue'
import ModalLayer from './ModalLayer.vue'
import PokemonForm from './PokemonForm.vue';
import { usePokemonStore } from '../store/pokemonStore'
import { useGlobalStore } from '../store/globalStore'

const isLogged = ref(false);
const store = useStore();
const pokemonStore = usePokemonStore()
const globalStore = useGlobalStore()

onMounted(() => {
  isLogged.value = !!store.getToken();
  pokemonStore.getListPokemonFiltered()
});

</script>

<template>
  <div>
    <div class="content">
      <SearchBar @show-form="globalStore.toogleShowModal()"></SearchBar>
      <FilterBar>
      </FilterBar>
      <main class="main">
        <PokemonList :pokemons="pokemonStore.pokemons"></PokemonList>
      </main>
      <ModalLayer v-show="globalStore.showModal">
      <template v-slot:header>
        <h2>Add Pokemon</h2>
      </template>
      <template v-slot:body>
        <PokemonForm @close-modal="()=>{ GetPokemonList;}"/>
      </template>
    </ModalLayer>
    </div>
  </div>
</template>


<style>
body {
  padding: 0;
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}

.header__left {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.title {
  font-size: 24px;
  font-weight: 400;
}

</style>
