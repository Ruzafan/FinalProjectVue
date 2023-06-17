<script setup>
import { ref, computed, onMounted } from 'vue';
import { Pokemon } from '../models/pokemon';
import { useStore } from '../store/user';
import SearchBar from './SearchBar.vue'
import FilterBar from './FilterBar.vue'
import PokemonList from './PokemonList.vue'
import ModalLayer from './ModalLayer.vue'
import PokemonForm from './PokemonForm.vue';
import { usePokemonStore } from '../store/pokemonStore'
const sortBy = ref("name");
const orderBy = ref("asc");
const capturedOnly = ref(false);
const searchTerm = ref("");
const pokemons = ref([]);
const isLogged = ref(false);
const store = useStore();
const showModal = ref(false);
const pokemonStore = usePokemonStore()
const filteredPokemons = computed(() => {
  let result = pokemons.value;
  if(capturedOnly.value){
    result = result.filter(pokemon => pokemon.captured);
  }
  if (searchTerm.value) {
    result = result.filter(pokemon => pokemon.title.toLowerCase().includes(searchTerm.value.toLowerCase()));
  }
  result.sort((a, b) => {
    if (a[sortBy.value.toLowerCase()] < b[sortBy.value.toLowerCase()]) {
      return -1;
    } else if (a[sortBy.value.toLowerCase()] > b[sortBy.value.toLowerCase()]) {
      return 1;
    }
    return 0;
  });

  if (orderBy.value === "desc") {
    result.reverse();
  }
  return result;
});

const GetPokemonList = async () => {
  pokemons.value = await pokemonStore.pokemons.value
};

const sort = (event) => {
  sortBy.value = event;
};

const onlyCaptured = (event) => {
  capturedOnly.value = event
}

const order = (event) => {
  orderBy.value = event;
};

const setSearchTerm = (event) => {
  searchTerm.value = event;
};

const toggleForm = () => {
  showModal.value = !showModal.value;
};

onMounted(() => {
  const token = store.getToken();
  if (token) {
    isLogged.value = true;
  }

  GetPokemonList()

});

</script>

<template>
  <div>
    <div class="content">
      <SearchBar @show-form="toggleForm" @search="setSearchTerm"></SearchBar>
      <FilterBar @orderItems="order" @sortItems="sort" @only-captured="onlyCaptured" :isLogged="isLogged">
      </FilterBar>
      <main class="main">
        <PokemonList :pokemons="filteredPokemons"></PokemonList>
      </main>
      <ModalLayer v-show="showModal" @close-modal="toggleForm">
      <template v-slot:header>
        <h2>Add Pokemon</h2>
      </template>
      <template v-slot:body>
        <PokemonForm @close-modal="()=>{toggleForm; GetPokemonList;}"/>
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
