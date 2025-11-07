<template>
  <div class="page-wrapper">
    <TheHeader />
    <HomeView />
  </div>
</template>

<script setup lang="ts">
import TheHeader from "@/components/layout/TheHeader.vue";
import HomeView from "@/views/HomeView.vue";
</script>

<style scoped lang="scss">
.page-header {
  margin-bottom: 30px;
}
</style>
