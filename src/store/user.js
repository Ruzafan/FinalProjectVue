import { defineStore } from "pinia";

export const useStore = defineStore("user", {
  state: () => ({
      logged: false,
      name: "",
      token: "",
    }),
  actions:{
    setUserData(name, token){
      this.name = name
      this.token = token
      this.logged = this.name && this.token
    },
    isLogged(){
      return state.logged
    },
    getName(){
      return this.name
    },
    getToken(){
      return this.token
    }
  }
});
