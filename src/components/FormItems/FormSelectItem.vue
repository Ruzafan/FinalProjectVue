<script setup>
import { defineEmits, defineProps } from 'vue';
const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue', 'fieldName','selectorValues'])
</script>

<template>
    <div class="form__form-group">
        <label>{{ fieldName }}:</label>
        <select :model="modelValue" @change="$emit('update:modelValue', $event.target.value)"  >
            <option v-for="item in selectorValues" :value="item.Value">{{item.Description ?? item.Value}}</option>
        </select>
    </div>
</template>
