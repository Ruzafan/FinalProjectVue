// Import necessary dependencies

import { defineStore } from "pinia";
import { Pokemon } from "../models/pokemon";
import { useStore } from "./user";
import axios from "axios";
import {ref} from 'vue'

// Define your store
const baseUrl = "http://localhost:3000";
export const usePokemonStore = defineStore("pokemon", () => {
  const pokemons = ref([]);
  const sortBy = ref(null);
  const searchTerm = ref(null);
  const capturedOnly = ref(false);
  const orderBy = ref(null);
  const getPokemon = async (id) => {
    const store = useStore();
    let config = {
      headers: {
        authorization: store.getToken(),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/pokemon?id=" + id, config);
      if (response.status !== 200) {
        return null;
      }
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getListPokemon = async () => {
    const store = useStore();
    const config = {
      headers: {
        authorization: store.getToken(),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/pokedex", config);
      if (response.status !== 200) {
        return null;
      }
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getListPokemonFiltered = async () => {
    let result = await getListPokemon();
    if (capturedOnly.value) {
      result = result.filter((pokemon) => pokemon.captured);
    }
    if (searchTerm.value) {
      result = result.filter((pokemon) =>
        pokemon.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    }
    result.sort((a, b) => {
      if (a[sortBy.value.toLowerCase()] < b[sortBy.value.toLowerCase()]) {
        return -1;
      } else if (
        a[sortBy.value.toLowerCase()] > b[sortBy.value.toLowerCase()]
      ) {
        return 1;
      }
      return 0;
    });

    if (orderBy.value === "desc") {
      result.reverse();
    }
    pokemons.value = result;
  };

  return {
    pokemons,
    getPokemon,
    getListPokemonFiltered,
    sortBy,
    searchTerm,
    capturedOnly,
    orderBy,
  };
});
