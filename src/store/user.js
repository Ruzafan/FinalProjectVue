import { defineStore } from "pinia";

export const useStore = defineStore("user", {
  state: () => ({
      logged: false,
      name: "",
      token: "",
    }),
  actions:{
    setUserData(name, token){
      localStorage.setItem("name", name);
      this.name = name
      localStorage.setItem("token", token);
      this.token = token
      this.logged = this.name && this.token
    },
    isLogged(){
      return state.logged
    },
    getName(){
      if(this.name)
      {
        return this.name
      }else if(localStorage.getItem("name"))
      {
        return localStorage.getItem("name")
      }
    },
    getToken(){
      if(this.token)
      {
        return this.token
      }else if(localStorage.getItem("token"))
      {
        return localStorage.getItem("token")
      }
      
    }
  }
});
