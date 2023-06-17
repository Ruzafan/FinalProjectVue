<script setup>
import { defineEmits, defineProps } from 'vue';
const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue', 'fieldName'])
</script>

<template>
    <div class="form__form-group">
        <label>{{ fieldName }}:</label>
        <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>
