<script setup>
import { usePokemonStore } from '../store/pokemonStore'
import { useStore } from '../store/user';

const userStore = useStore()

const pokemonStore = usePokemonStore()
</script>
<template>
    <div class="filter-bar">
        <div class="filter-bar__select">
            <label for="sort-select">Sort by:</label>
            <select id="sort-select" @change="pokemonStore.setSortBy($event.target.value)">
                <option value="name">Name</option>
                <option value="height">Height</option>
                <option value="weight">Weight</option>
                
            </select>
        </div>
        <div class="filter-bar__select">
            <label for="order-select">Order:</label>
            <select id="order-select"  @change="pokemonStore.setOrderBy($event.target.value)">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
        <div class="filter-bar__check" v-show="userStore.isLogged()">
            <label for="captured-checkbox">Captured:</label>
            <input type="checkbox" id="captured-checkbox"
                @change="pokemonStore.setCapturedOnly($event.target.checked)">
        </div>
    </div>
</template>
  
<style scoped>


.filter-bar {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
}
.filter-bar__select {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.filter-bar__select label {
  margin-right: 10px;
}
.filter-bar__select select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}
.filter-bar__check {
  display: flex;
  align-items: center;
}
.filter-bar__check input {
  margin-right: 10px;
}
.filter-bar__check label {
  cursor: pointer;
}

</style>
  