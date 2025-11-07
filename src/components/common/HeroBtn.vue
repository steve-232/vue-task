<template>
  <BaseBtn
    :type="type"
    :disabled="disabled"
    :loading="loading"
    class="hero-btn"
    data-testid="hero-btn"
    ><slot></slot
  ></BaseBtn>
</template>

<script setup lang="ts">
import BaseBtn from "@/components/ui/BaseBtn.vue";

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

<style scoped lang="scss">
button {
  padding: 14px 26px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: var(--color-btn-bg);
  border: 1px solid var(--color-border-primary);
  transition: opacity 100ms linear 10ms;

  &:not(:disabled):hover {
    opacity: 0.7;
    cursor: pointer;
  }
}
</style>
