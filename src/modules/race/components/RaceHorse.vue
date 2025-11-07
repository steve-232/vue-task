<template>
  <BaseRacePath
    :label="label"
    :animation-duration="horseSpeed"
    @animation-end="handleAnimationEnd"
  >
    <FontAwesomeIcon
      class="horse"
      data-testid="race-horse-icon"
      :icon="faHorse"
      size="2xl"
      :color="horse.color"
    />
  </BaseRacePath>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHorse } from "@fortawesome/free-solid-svg-icons";
import BaseRacePath from "@/components/ui/BaseRacePath.vue";
import {
  HORSE_BASE_SPEED,
  HORSE_MAX_CONDITION,
  HORSE_CONDITION_PENALTY,
} from "@/config";
import type { Horse } from "@/modules/horse/ts";

interface Props {
  label?: string;
  horse: Horse;
}

const { label, horse } = defineProps<Props>();

const emit = defineEmits<{
  finishedTheRace: [horse: Horse];
}>();

const handleAnimationEnd = () => {
  emit("finishedTheRace", { ...horse });
};

const calculateHorseSpeed = (condition: number): number => {
  // Speed decreases as the condition worsens
  return (
    HORSE_BASE_SPEED +
    (HORSE_MAX_CONDITION - condition) * HORSE_CONDITION_PENALTY
  );
};

const horseSpeed = computed(() => calculateHorseSpeed(horse.condition));
</script>
