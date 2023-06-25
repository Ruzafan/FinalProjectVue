<script setup>
import { useStore } from '../store/user';
import { usePokemonStore } from '../store/pokemonStore'
import { useGlobalStore } from '../store/globalStore';
import { ref} from 'vue'
const store = useStore()
const pokemonStore = usePokemonStore()
const globalStore = useGlobalStore()
var searchTrem = ref("")
pokemonStore.setSearchTerm(searchTrem.value)

const changeSearchTerm = (term) => {
  pokemonStore.setSearchTerm(term)
  searchTrem.value = term
}
</script>

<template>
    <div class="search-bar">
        <input type="text" placeholder="Search pokemon" @input="changeSearchTerm($event.target.value)" :value="searchTrem">
        <button class="clear" @click="changeSearchTerm('')">Clear</button>
        <button class="add" v-if="store.isLogged()"  @click="globalStore.toogleShowModal()">Add pokemon</button>
    </div>
</template>
  
<style>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.search-bar input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
}
.search-bar button {
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  min-width: 100px;
}
.search-bar .clear {
  margin-right: 10px;
}
.search-bar .add {
  background-color: #4caf50;
  color: #fff;
}
</style>
  