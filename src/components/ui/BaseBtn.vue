<template>
  <button :type="type" :disabled="disabled || loading">
    <span v-if="loading">Loading...</span><slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: "button",
  disabled: false,
  loading: false,
});
</script>
