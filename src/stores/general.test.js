import { setActivePinia, createPinia } from "pinia";
import { useGeneralStore } from "@/stores/general";

const PlayState = {
  RUNNING: "Running",
  PAUSED: "Paused",
};

describe("useGeneralStore", () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useGeneralStore();
  });

  it("should initializes correct default state", () => {
    expect(store.playState).toBe(PlayState.PAUSED);
  });

  it("should set playState to PAUSED, when pauseRace() is called", () => {
    store.startRace();
    store.pauseRace();
    expect(store.playState).toBe(PlayState.PAUSED);
  });

  it("should set playState to RUNNING, when startRace() is called", () => {
    store.startRace();
    expect(store.playState).toBe(PlayState.RUNNING);
  });

  it("should switches between PAUSED and RUNNING, when togglePlayState() is called", () => {
    store.togglePlayState();
    expect(store.playState).toBe(PlayState.RUNNING);
    store.togglePlayState();
    expect(store.playState).toBe(PlayState.PAUSED);
  });
});
