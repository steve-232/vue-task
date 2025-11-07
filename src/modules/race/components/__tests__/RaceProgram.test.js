import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RaceProgram from "@/modules/race/components/RaceProgram.vue";

const sampleData = [
  {
    id: 1,
    title: "Race 1",
    length: 1200,
    participants: [
      { id: 1, position: 1, name: "Thunder" },
      { id: 2, position: 2, name: "Bolt" },
    ],
  },
  {
    id: 2,
    title: "Race 2",
    length: 1400,
    participants: [{ id: 3, position: 1, name: "Blaze" }],
  },
];

const raceStoreMock = {
  raceSchedule: [],
};

vi.mock("@/modules/race/stores/race", () => ({
  useRaceStore: vi.fn(() => raceStoreMock),
}));

vi.mock("pinia", () => ({
  storeToRefs: (store) => ({
    raceSchedule: store.raceSchedule,
  }),
}));

describe("RaceProgram.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    raceStoreMock.raceSchedule = [];
  });

  it("should render Column with correct title", () => {
    const wrapper = mount(RaceProgram);
    const column = wrapper.get('[data-testid="race-program-column"]');

    expect(column.exists()).toBe(true);
    expect(wrapper.text()).toContain("Program");
  });

  it("should show 'No Program' message when raceSchedule is empty", () => {
    const wrapper = mount(RaceProgram);
    const noContent = wrapper.get(
      '[data-testid="race-program-column-no-content"]'
    );

    expect(noContent.exists()).toBe(true);
    expect(noContent.text()).toBe("No Program");
  });

  it("should render one TableScorePosition per race when schedule is not empty", () => {
    raceStoreMock.raceSchedule = sampleData;
    const wrapper = mount(RaceProgram);
    const tables = wrapper.findAll(
      '[data-testid="race-program-column-schedule-table"]'
    );

    expect(tables).toHaveLength(sampleData.length);
  });

  it("should display correct race titles in rendered output", () => {
    raceStoreMock.raceSchedule = sampleData;
    const wrapper = mount(RaceProgram);

    expect(wrapper.text()).toContain(
      `${sampleData[0].title} - ${sampleData[0].length}`
    );
    expect(wrapper.text()).toContain(
      `${sampleData[1].title} - ${sampleData[1].length}`
    );
  });

  it("should display participant names when races are present", () => {
    raceStoreMock.raceSchedule = sampleData;
    const wrapper = mount(RaceProgram);

    expect(wrapper.text()).toContain(sampleData[0].participants[0].name);
    expect(wrapper.text()).toContain(sampleData[0].participants[1].name);
    expect(wrapper.text()).toContain(sampleData[1].participants[0].name);
  });

  it("should not display 'No Program' text when raceSchedule is not empty", () => {
    raceStoreMock.raceSchedule = sampleData;
    const wrapper = mount(RaceProgram);
    const noContent = wrapper.find(
      '[data-testid="race-program-column-no-content"]'
    );

    expect(noContent.exists()).toBe(false);
  });
});
