<template>
  <section class="column">
    <header
      v-if="title.length"
      class="column__header"
      data-testid="column-header"
      :style="[{ textAlign, backgroundColor: headerBgColor }]"
    >
      <BaseTitle tag="h3">{{ title }}</BaseTitle>
    </header>
    <div class="column__content" data-testid="column-content">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseTitle from "@/components/ui/BaseTitle.vue";

interface Props {
  title?: string;
  textAlign?: "center" | "right" | "left";
  headerBgColor?: string;
}

withDefaults(defineProps<Props>(), {
  title: "",
  textAlign: "left",
  headerBgColor: "#fff",
});
</script>

<style scoped lang="scss">
.column {
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;

  &__header {
    padding: 15px 20px;
    border: 1px solid var(--color-border-primary);
  }
  &__content {
    overflow-y: auto;
  }
}

@include max($bp-xl) {
  .column {
    height: auto;
  }
}
</style>
