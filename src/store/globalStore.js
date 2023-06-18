import { defineStore } from "pinia";
import { ref} from 'vue'
export const useGlobalStore = defineStore("global", () => {
 const showModal = ref(false)

 const toogleShowModal = () => {
    showModal.value = !showModal.value
 }

 return {showModal, toogleShowModal}
});
