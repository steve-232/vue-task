import { ref } from "vue";
import { defineStore } from "pinia";
import { generateUniqueId, generateRandomNumber, pickAndRemove } from "@/utils";
import {
  NUMBER_OF_HORSES,
  HORSE_NAMES,
  HORSE_COLORS,
  HORSE_MAX_CONDITION,
} from "@/config";
import type { Horse } from "@/modules/horse/ts";

export const useHorseStore = defineStore("horse", () => {
  const horses = ref<Horse[]>([]);

  function generateHorses() {
    const names = [...HORSE_NAMES];
    const colors = [...HORSE_COLORS];
    const newState: Horse[] = [];

    function createHorse(): Horse {
      return {
        id: generateUniqueId(),
        condition: generateRandomNumber(1, HORSE_MAX_CONDITION),
        name: pickAndRemove(names),
        color: pickAndRemove(colors),
      };
    }

    for (let i = 0; i < NUMBER_OF_HORSES; i++) {
      newState.push(createHorse());
    }

    horses.value = newState;
  }

  return {
    horses,
    generateHorses,
  };
});
