<script setup>
import FormTextItem from "./FormItems/FormTextItem.vue"
import FormNumberItem from "./FormItems/FormNumberItem.vue"
import FormTextAreaItem from "./FormItems/FormTextAreaItem.vue"
import FormCheckBoxItem from "./FormItems/FormCheckBoxItem.vue"
import FormSelectItem from "./FormItems/FormSelectItem.vue"
import { defineEmits, reactive , ref} from 'vue'
import { Pokemon } from "../models/pokemon"
import axios from "axios";
import { useStore } from '../store/user';

var form = new Pokemon()
var type1 = ""
var type2 = ""
var abilities = ""
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
const store = useStore()
var displayError = ref(false);
const emit = defineEmits(['add-pokemon'])
var submitForm = () => {
    if (form.name && form.description && abilities && type1) {
        displayError.value = false;
        form.abilities = abilities ? abilities.split(',').map((g) => g.trim()) : ""
        form.types = !!type2 ? [type1, type2] : [type1]

        const config = {
            headers: {
                authorization: store.getToken()
            }
        };
        axios
            .post("http://localhost:3000/pokemon",form, config)
            .then(response => {
                if(response.code == 200)
                {
                    form = new Pokemon()
                    emit('close-modal')
                }
            })
            .catch(err => console.log(err));
    } else {
        displayError.value = true;
    }
}
</script>
<template>
    <div class="form">
        <form class="form__form" @submit.prevent="submitForm">

            <FormTextItem v-model="form.name" fieldName="Name" />
            <FormNumberItem v-model="form.id" fieldName="Id" />

            <FormTextAreaItem v-model="form.description" fieldName="Description" />
            <FormCheckBoxItem v-model="form.captured" fieldName="Captured" />

            <FormTextItem v-model="form.species" fieldName="Species" />

            <FormTextItem v-model="abilities" fieldName="Abilities" />
            <FormTextItem v-model="form.sprite" fieldName="Avatar" />

            <FormNumberItem v-model="form.height" fieldName="Height" />
            <FormNumberItem v-model="form.weight" fieldName="Weight" />

            <FormSelectItem v-model="type1" fieldName="Type 1" :selectorValues="typesValues" />
            <FormSelectItem v-model="type2" fieldName="Type 2" :selectorValues="typesValues" />



            <div v-if=displayError>
                <span>An error has ocurred</span>
            </div>
            <div class="form__form-group">
                <button type="submit" class="form__submit">Add Book</button>
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
}</style>