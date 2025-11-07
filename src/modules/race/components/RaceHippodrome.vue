<template>
  <section class="hippodrome" data-testid="race-hippodrome-column">
    <BaseText v-if="!activeRace" data-testid="race-hippodrome-column-no-content"
      >No Race</BaseText
    >
    <div v-else>
      <div class="hippodrome__content" :key="refreshKey">
        <RaceHorse
          v-for="(horse, i) in activeRace?.participants"
          :label="`${i + 1}`"
          :key="horse.id"
          :data-testid="`race-hippodrome-column-horse-${horse.id}`"
          :horse="{
          id: horse.id,
          condition: horse.condition,
          color: horse.color as HorseColor,
          name: horse.name as HorseName,
        }"
          @finished-the-race="participantFinishedTheRace"
        />
      </div>
      <div
        class="hippodrome__footer"
        data-testid="race-hippodrome-column-footer"
      >
        {{ activeRace?.title }} - {{ activeRace?.length }}m
        <span>Finish</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRaceStore } from "@/modules/race/stores/race";
import RaceHorse from "@/modules/race/components/RaceHorse.vue";
import BaseText from "@/components/ui/BaseText.vue";
import { NUMBER_OF_HORSES_PER_RACE } from "@/config";
import type { RaceParticipant } from "@/modules/race/ts";
import type { HorseColor, HorseName } from "@/modules/horse/ts";

const raceStore = useRaceStore();
const { activeRace } = storeToRefs(raceStore);

const refreshKey = ref(0);
const howManyParticipantsFinishedTheRace = ref(0);

const participantFinishedTheRace = (
  participant: Omit<RaceParticipant, "position">
) => {
  raceStore.finishedTheRace({
    ...participant,
    position: howManyParticipantsFinishedTheRace.value + 1,
  });
  howManyParticipantsFinishedTheRace.value += 1;
};

watch(howManyParticipantsFinishedTheRace, (newVal) => {
  if (newVal === NUMBER_OF_HORSES_PER_RACE) {
    howManyParticipantsFinishedTheRace.value = 0;
    raceStore.nextActiveRace();
    refreshKey.value = activeRace.value?.id as number;
  }
});

watch(
  () => raceStore.raceSchedule,
  () => {
    refreshKey.value = activeRace.value?.id as number;
    howManyParticipantsFinishedTheRace.value = 0;
  }
);
</script>

<style scoped lang="scss">
.hippodrome {
  padding: 0 50px 0 30px;
  box-sizing: border-box;

  &__content {
    border-right: solid 4px var(--color-warning);
  }
  &__footer {
    position: relative;
    padding: 14px 0;
    text-align: center;
    color: var(--color-warning);
    font-weight: bold;

    span {
      position: absolute;
      right: -20px;
    }
  }

  :deep(.race-path:last-child) {
    .race-path__position {
      border-bottom: 2px solid var(--color-secondary);
    }
    .race-path__content {
      border-bottom: 2px dashed var(--color-primary);
    }
  }
}

@include max($bp-xl) {
  .hippodrome {
    padding-left: 0;
  }
}
</style>
