import { ref, readonly } from "vue";
import { defineStore } from "pinia";
import { PlayState } from "@/ts";

export const useGeneralStore = defineStore("general", () => {
  const playState = ref<PlayState>(PlayState.PAUSED);

  function pauseRace() {
    playState.value = PlayState.PAUSED;
  }

  function startRace() {
    playState.value = PlayState.RUNNING;
  }

  function togglePlayState() {
    if (playState.value === PlayState.PAUSED) {
      startRace();
    } else {
      pauseRace();
    }
  }

  return {
    playState: readonly(playState),
    togglePlayState,
    startRace,
    pauseRace,
  };
});
