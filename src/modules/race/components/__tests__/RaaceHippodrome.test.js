import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RaceHippodrome from "@/modules/race/components/RaceHippodrome.vue";

const PlayState = {
  RUNNING: "Running",
  PAUSED: "Paused",
};

const sampleData = {
  id: 1,
  title: "Race 1",
  length: 1200,
  participants: [
    { id: 1, name: "Thunder", condition: 90, color: "red" },
    { id: 2, name: "Blaze", condition: 80, color: "blue" },
  ],
};

const generalStoreMock = {
  playState: PlayState.RUNNING,
  togglePlayState: vi.fn(),
};

const raceStoreMock = {
  activeRace: null,
  raceSchedule: [],
  finishedTheRace: vi.fn(),
  nextActiveRace: vi.fn(),
};

vi.mock("@/stores/general", () => ({
  useGeneralStore: vi.fn(() => generalStoreMock),
}));

vi.mock("@/modules/race/stores/race", () => ({
  useRaceStore: vi.fn(() => raceStoreMock),
}));

vi.mock("pinia", () => ({
  storeToRefs: (store) => ({
    activeRace: store.activeRace,
  }),
}));

describe("RaceHippodrome.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    raceStoreMock.activeRace = null;
  });

  it("should display 'No Race' text when no activeRace is present", () => {
    const wrapper = mount(RaceHippodrome);
    const noRace = wrapper.get(
      '[data-testid="race-hippodrome-column-no-content"]'
    );

    expect(noRace.exists()).toBe(true);
    expect(noRace.text()).toBe("No Race");
  });

  it("should render horses when activeRace exists", async () => {
    raceStoreMock.activeRace = sampleData;
    const wrapper = mount(RaceHippodrome);
    const horses = wrapper.findAll(
      '[data-testid^="race-hippodrome-column-horse-"]'
    );

    expect(horses.length).toBe(sampleData.participants.length);
  });

  it("should render footer with race title and length", () => {
    raceStoreMock.activeRace = sampleData;
    const wrapper = mount(RaceHippodrome);
    const footer = wrapper.get('[data-testid="race-hippodrome-column-footer"]');

    expect(footer.text()).toContain(raceStoreMock.activeRace.title);
    expect(footer.text()).toContain(raceStoreMock.activeRace.length + "m");
  });
});
