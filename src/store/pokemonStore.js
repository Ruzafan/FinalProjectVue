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
  const sortBy = ref('name');
  const searchTerm = ref('');
  const capturedOnly = ref(false);
  const orderBy = ref('asc');

  const getPokemon = async (id) => {
    const store = useStore();
    let config = {
      headers: {
        authorization: store.getToken(),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/pokemon?id=" + id, config);
      if (response.data.code !== 200) {
        return null;
      }
      return new Pokemon(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

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
      let pokemonList = response.data.data
      let result = []
      for(let i= 0;i<pokemonList.length;i++)
      {
        result.push(new Pokemon(pokemonList[i]))
      }
      return result
    } catch (err) {
      console.log(err);
    }
  }

  const removePokemon = async (id) => {
    const store = useStore();
    const config = {
      headers: {
        authorization: store.getToken(),
      },
      data: { "id": id }
    };
    try {
      const response = await axios.delete(baseUrl + "/pokemon", config);
      if (response.status !== 200) {
        return null;
      }
      getListPokemonFiltered()
    } catch (err) {
      console.log(err);
    }
  }

  const addPokemon = async (pokemon) => {
    const store = useStore();

    const config = {
      headers: {
          authorization: store.getToken()
      }
  };
    return await axios.post("http://localhost:3000/pokemon", pokemon, config)
  }
  const getListPokemonFiltered = async () => {
    let result = await getListPokemon();
    if(result){
      if (capturedOnly.value) {
        result = result.filter((pokemon) => pokemon.captured);
      }
      if (searchTerm.value) {
        result = result.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      }
      debugger;
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
    }
    pokemons.value = result;
  };
  
  const setSortBy = (sortFilter) => {
    if(sortFilter)
    {
      sortBy.value = sortFilter
      getListPokemonFiltered()
    }
  }

  const setSearchTerm = (searchTermFilter) => {
      searchTerm.value = searchTermFilter
      getListPokemonFiltered()
  }

  const setCapturedOnly = (capturedOnlyFilter) => {
    capturedOnly.value = capturedOnlyFilter
    getListPokemonFiltered()
  }

  const setOrderBy = (orderByFilter) => {
    if(orderByFilter)
    {
      orderBy.value = orderByFilter
      getListPokemonFiltered()
    }
  }
  
  return {
    pokemons,
    getPokemon,
    getListPokemonFiltered,
    setOrderBy,
    setSearchTerm,
    setCapturedOnly,
    setSortBy,
    removePokemon,
    addPokemon
  };
});
