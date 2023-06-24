import { defineStore } from "pinia";
import { ref} from 'vue'
export const useGlobalStore = defineStore("global", () => {
 const showModal = ref(false)
 const showLoginModal = ref(false)
 const toogleShowModal = () => {
    showModal.value = !showModal.value
 }

 const toogleShowLoginModal = () => {
   showLoginModal.value = !showLoginModal.value
}
 return {showModal, toogleShowModal,showLoginModal,toogleShowLoginModal}
});
