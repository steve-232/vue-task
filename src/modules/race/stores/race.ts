import { ref } from "vue";
import { defineStore } from "pinia";
import { useGeneralStore } from "@/stores/general";
import { useHorseStore } from "@/modules/horse/stores/horse";
import { generateUniqueId, pickAndRemove } from "@/utils";
import {
  NUMBER_OF_RACES,
  NUMBER_OF_HORSES_PER_RACE,
  RACE_LENGTH,
} from "@/config";
import type { Race, RaceParticipant } from "@/modules/race/ts";

export const useRaceStore = defineStore("race", () => {
  const raceSchedule = ref<Race[]>([]);
  const activeRace = ref<Race>();
  const activeRaceIndex = ref(0);
  const results = ref<Race[]>([]);
  const newCircle = ref(false);

  function generateRace(index: number): Race {
    const race: Race = {
      id: generateUniqueId(),
      title: `Lap ${index + 1}`,
      length: RACE_LENGTH[index] as number,
      participants: [],
    };
    const horseStore = useHorseStore();
    const horsesList = [...horseStore.horses];

    for (let i = 0; i < NUMBER_OF_HORSES_PER_RACE; i++) {
      const selectedHorse = pickAndRemove(horsesList);

      race.participants.push({
        id: selectedHorse.id,
        position: i + 1,
        name: selectedHorse.name,
        color: selectedHorse.color,
        condition: selectedHorse.condition,
      });
    }

    return race;
  }

  function generateRaceSchedule() {
    raceSchedule.value = [];
    activeRaceIndex.value = 0;
    results.value = [];

    for (let i = 0; i < NUMBER_OF_RACES; i++) {
      raceSchedule.value.push(generateRace(i));
    }

    activeRace.value = raceSchedule.value[0];

    insertNewRaceIntoResults(activeRaceIndex.value);
  }

  function insertNewRaceIntoResults(raceIndex: number) {
    results.value.push({
      id: generateUniqueId(),
      length: raceSchedule.value[raceIndex]?.length as number,
      title: raceSchedule.value[raceIndex]?.title as string,
      participants: [],
    });
  }

  function finishedTheRace(participant: RaceParticipant) {
    if (newCircle.value) {
      results.value = [];
      insertNewRaceIntoResults(activeRaceIndex.value);
      newCircle.value = false;
    }
    results.value[activeRaceIndex.value]?.participants.push(participant);
  }

  function nextActiveRace() {
    if (activeRaceIndex.value < NUMBER_OF_RACES - 1) {
      activeRaceIndex.value += 1;
      activeRace.value = raceSchedule.value[activeRaceIndex.value];
      insertNewRaceIntoResults(activeRaceIndex.value);
    } else {
      const generalStore = useGeneralStore();
      generalStore.pauseRace();
      activeRaceIndex.value = 0;
      activeRace.value = raceSchedule.value[activeRaceIndex.value];
      newCircle.value = true;
    }
  }

  return {
    raceSchedule,
    activeRace,
    nextActiveRace,
    generateRaceSchedule,
    results,
    finishedTheRace,
  };
});
