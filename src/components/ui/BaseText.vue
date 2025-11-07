<template>
  <component :is="tag">
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  tag?: "p" | "span" | "i" | "b";
}

withDefaults(defineProps<Props>(), { tag: "p" });
</script>
