<template>
  <div class="page-home">
    <HorseColumn />
    <RaceHippodrome />
    <RaceProgram />
    <RaceResults />
  </div>
</template>

<script setup lang="ts">
import HorseColumn from "@/modules/horse/components/HorseColumn.vue";
import RaceHippodrome from "@/modules/race/components/RaceHippodrome.vue";
import RaceProgram from "@/modules/race/components/RaceProgram.vue";
import RaceResults from "@/modules/race/components/RaceResults.vue";
</script>

<style scoped lang="scss">
.page-home {
  display: grid;
  grid-template-columns: 1fr 2fr 0.9fr 0.9fr;
}

@include max($bp-xl) {
  .page-home {
    padding: 0 50px 50px;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
  }
}

@include max($bp-lg) {
  .page-home {
    grid-template-columns: auto;
  }
}
</style>
