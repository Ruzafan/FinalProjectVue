<script setup>
import FormTextItem from "./FormItems/FormTextItem.vue"
import FormNumberItem from "./FormItems/FormNumberItem.vue"
import FormTextAreaItem from "./FormItems/FormTextAreaItem.vue"
import FormCheckBoxItem from "./FormItems/FormCheckBoxItem.vue"
import FormSelectItem from "./FormItems/FormSelectItem.vue"
import { reactive, ref } from 'vue'
import { Pokemon } from "../models/pokemon"
import { useGlobalStore } from "../store/globalStore"
import { usePokemonStore } from "../store/pokemonStore"
var form = ref(new Pokemon())
var type1 = ref("")
var type2 = ref("")
var abilities = ref("")
var typesValues = reactive([{
    Value: "",
    Description: "Not defined"
}, {
    Value: "Bug"
}, {
    Value: "Electric",
}, {
    Value: "Fairy",
}, {
    Value: "Grass",
}, {
    Value: "Ghost",
}, {
    Value: "Electric",
}, {
    Value: "Dragon",
}, {
    Value: "Ground",
}, {
    Value: "Ice",
}, {
    Value: "Flying",
}, {
    Value: "Dark",
}, {
    Value: "Water",
}, {
    Value: "Normal",
}, {
    Value: "Psychic",
}, {
    Value: "Steel",
}, {
    Value: "Rock",
}, {
    Value: "Fighting",
}, {
    Value: "Fire",
}, {
    Value: "Poison",
},]);
var displayError = ref(false);
const globalStore = useGlobalStore()
const pokemonStore = usePokemonStore()
var submitForm = async ()  => {
    if (form.value.id && form.value.name && form.value.description && abilities.value && type1.value) {
        form.value.id = parseInt(form.value.id)
        displayError.value = false;
        form.value.abilities = abilities.value ? abilities.value.split(',').map((g) => g.trim()) : ""
        form.value.types = !!type2.value ? [type1.value, type2.value] : [type1.value]
        let response = await pokemonStore.addPokemon(form.value)
            
        if (response.status == 200) {
            form.value = new Pokemon()
            type1.value = null
            type2.value = null
            abilities.value = ""
            globalStore.toogleShowModal()
            pokemonStore.getListPokemonFiltered()
        }
           
    } else {
        displayError.value = true;
    }
}
</script>
<template>
    <div class="form">
        <form class="form__form" @submit.prevent="submitForm">

            <FormNumberItem v-model="form.id" fieldName="Id" />
            <FormTextItem v-model="form.name" fieldName="Name" />

            <FormTextAreaItem v-model="form.description" fieldName="Description" />
            <FormCheckBoxItem v-model="form.captured" fieldName="Captured" />

            <FormTextItem v-model="form.species" fieldName="Species" />

            <FormTextItem v-model="abilities" fieldName="Abilities" />
            <FormTextItem v-model="form.sprite" fieldName="Avatar" />

            <FormNumberItem v-model="form.height" fieldName="Height" />
            <FormNumberItem v-model="form.weight" fieldName="Weight" />

            <FormSelectItem v-model="type1" fieldName="Type 1" :selectorValues="typesValues" />
            <FormSelectItem v-model="type2" fieldName="Type 2" :selectorValues="typesValues" />

            <div class="form__form-group">
                <button type="submit" class="form__submit">Add Pokemon</button>
            </div>

            <div v-if=displayError>
                <span>An error has ocurred</span>
            </div>

        </form>
    </div>
</template>
<style scoped>
.form:deep(.form__form-group label) {
    display: block;
    margin-bottom: 10px;
    text-align: left;
    font-size: 14px;
}

.form:deep(.form__form-group input),
.form:deep(.form__form-group select),
.form:deep(.form__form-group textarea) {
    width: 80%;
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    text-align: left;
}

.form:deep(.form__form-group input:focus),
.form:deep(.form__form-group select:focus),
.form:deep(.form__form-group textarea:focus) {
    border-color: #000;
}

.form:deep(.form__form-group textarea) {
    height: 100px;
}

.form:deep(.form__form-group select) {
    width: 83%;

}

.form:deep(.form__submit) {
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    max-width: 83%;
    background-color: #4caf50;
    color: #fff;
}

.form:deep(.form__submit:hover) {
    background-color: #43a047;
}

.form__form {
    display: flex;
    flex-wrap: wrap;
}

.form__form-group {
    margin-bottom: 20px;
    width: 50%;
    display: flex;
    flex-direction: column;
}

.form__form-group label {
    display: block;
    margin-bottom: 10px;
    text-align: left;
    font-size: 14px;
}

.form__form-group input,
.form__form-group select,
.form__form-group textarea {
    width: 80%;
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    text-align: left;
}

.form__form-group input:focus,
.form__form-group textarea:focus {
    border-color: #000;
}

.form__form-group textarea {
    height: 100px;
}

.form__submit {
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    min-width: 100px;
    background-color: #4caf50;
    color: #fff;
}

.form__submit:hover {
    background-color: #43a047;
}
</style>