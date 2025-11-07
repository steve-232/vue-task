import { setActivePinia, createPinia } from "pinia";
import { useRaceStore } from "@/modules/race/stores/race";

vi.mock("@/config", () => ({
  NUMBER_OF_RACES: 3,
  NUMBER_OF_HORSES_PER_RACE: 2,
  RACE_LENGTH: [1000, 1200, 1400],
}));

const mockPauseRace = vi.fn();
const mockHorses = [
  { id: 1, name: "Alpha", color: "Red", condition: 50 },
  { id: 2, name: "Beta", color: "Blue", condition: 60 },
  { id: 3, name: "Gamma", color: "Green", condition: 70 },
  { id: 4, name: "Delta", color: "Black", condition: 80 },
];

vi.mock("@/modules/horse/stores/horse", () => ({
  useHorseStore: vi.fn(() => ({
    horses: mockHorses,
    pauseRace: mockPauseRace,
  })),
}));

describe("useRaceStore", () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useRaceStore();

    vi.clearAllMocks();
  });

  it("should initialize with empty state", () => {
    expect(store.raceSchedule).toEqual([]);
    expect(store.results).toEqual([]);
    expect(store.activeRace).toBeUndefined();
  });

  it("generateRaceSchedule() should populate raceSchedule correctly", () => {
    store.generateRaceSchedule();

    expect(store.raceSchedule.length).toBe(3);
    expect(store.raceSchedule[0].id).toBeTypeOf("number");
    expect(store.raceSchedule[0].title).toBe("Lap 1");
    expect(store.raceSchedule[0].length).toBe(1000);
    expect(store.raceSchedule[0].participants.length).toBe(2);

    expect(store.activeRace.id).toBeTypeOf("number");
    expect(store.activeRace.title).toBe("Lap 1");
    expect(store.activeRace.length).toBe(1000);
    expect(store.activeRace.participants.length).toBe(2);

    expect(store.results[0].title).toBe("Lap 1");
    expect(store.results[0].length).toBe(1000);
    expect(store.results[0].participants.length).toBe(0);
  });

  it("finishedTheRace() should append participant to current result", () => {
    store.generateRaceSchedule();
    const participant = {
      id: 11,
      name: "Zeta",
      color: "Yellow",
      condition: 99,
      position: 1,
    };

    store.finishedTheRace(participant);

    const raceResults = store.results[0].participants;
    expect(raceResults).toContainEqual(participant);
  });

  it("finishedTheRace() should reset results before the start of new circle", () => {
    store.generateRaceSchedule();

    store.nextActiveRace();
    store.nextActiveRace();
    store.nextActiveRace();

    const participant = {
      id: 22,
      name: "Omega",
      color: "Silver",
      condition: 88,
      position: 1,
    };

    store.finishedTheRace(participant);

    expect(store.results.length).toBe(1);
    expect(store.results[0].participants).toContainEqual(participant);
  });

  it("nextActiveRace() should move to next race and insert results", () => {
    store.generateRaceSchedule();
    store.nextActiveRace();

    expect(store.activeRace.title).toBe("Lap 2");
    expect(store.results.length).toBe(2);
  });
});
