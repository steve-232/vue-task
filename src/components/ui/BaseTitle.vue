<template>
  <component :is="tag">
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

withDefaults(defineProps<Props>(), { tag: "h1" });
</script>
