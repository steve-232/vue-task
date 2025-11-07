<template>
  <header class="page-header">
    <BaseTitle
      tag="h2"
      class="page-header__title"
      data-testid="page-header-title"
      >Horse Racing</BaseTitle
    >

    <div class="page-header__actions">
      <HeroBtn
        @click="raceStore.generateRaceSchedule"
        data-testid="page-header-generate-program-btn"
        >Generate program</HeroBtn
      >
      <HeroBtn
        :disabled="raceStore.raceSchedule.length === 0"
        @click="generalStore.togglePlayState"
        data-testid="page-header-start-stop-btn"
        >{{
          generalStore.playState === PlayState.PAUSED ? "Start" : "Pause"
        }}</HeroBtn
      >
    </div>
  </header>
</template>
<script setup lang="ts">
import { PlayState } from "@/ts";
import { useGeneralStore } from "@/stores/general";
import { useRaceStore } from "@/modules/race/stores/race";
import BaseTitle from "@/components/ui/BaseTitle.vue";
import HeroBtn from "@/components/common/HeroBtn.vue";

const raceStore = useRaceStore();
const generalStore = useGeneralStore();
</script>

<style scoped lang="scss">
.page-header {
  display: flex;
  padding: 10px 30px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-header-bg-primary);
  border-bottom: solid 1px var(--color-border-primary);
  z-index: 1;

  &__title {
    margin: 0;
  }
  &__actions {
    display: flex;
    align-items: center;

    button {
      margin: 0 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

@include max($bp-xl) {
  .page-header {
    position: sticky;
    top: 0;
  }
}
</style>
