import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RaceResults from "@/modules/race/components/RaceResults.vue";

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
  results: [],
};

vi.mock("@/modules/race/stores/race", () => ({
  useRaceStore: vi.fn(() => raceStoreMock),
}));

vi.mock("pinia", () => ({
  storeToRefs: (store) => ({
    results: store.results,
  }),
}));

describe("RaceResults.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    raceStoreMock.results = [];
  });

  it("should render Column with correct title", () => {
    const wrapper = mount(RaceResults);
    const column = wrapper.get('[data-testid="race-results-column"]');

    expect(column.exists()).toBe(true);
    expect(wrapper.text()).toContain("Results");
  });

  it("should show 'No Results' message when results are empty", () => {
    raceStoreMock.results = [];
    const wrapper = mount(RaceResults);
    const noContent = wrapper.get(
      '[data-testid="race-results-column-no-content"]'
    );

    expect(noContent.exists()).toBe(true);
    expect(noContent.text()).toBe("No Results");
  });

  it("should render one Table per result when data is present", () => {
    raceStoreMock.results = sampleData;
    const wrapper = mount(RaceResults);
    const tables = wrapper.findAll(
      '[data-testid="race-results-column-results-table"]'
    );

    expect(tables).toHaveLength(sampleData.length);
  });

  it("should display correct race titles in rendered output", () => {
    raceStoreMock.results = sampleData;
    const wrapper = mount(RaceResults);

    expect(wrapper.text()).toContain(
      `${sampleData[0].title} - ${sampleData[0].length}`
    );
    expect(wrapper.text()).toContain(
      `${sampleData[1].title} - ${sampleData[1].length}`
    );
  });

  it("should display participant names when results are present", () => {
    raceStoreMock.results = sampleData;
    const wrapper = mount(RaceResults);

    expect(wrapper.text()).toContain(sampleData[0].participants[0].name);
    expect(wrapper.text()).toContain(sampleData[0].participants[1].name);
    expect(wrapper.text()).toContain(sampleData[1].participants[0].name);
  });

  it("should not display 'No Results' when results exist", () => {
    raceStoreMock.results = sampleData;
    const wrapper = mount(RaceResults);
    const noContent = wrapper.find(
      '[data-testid="race-results-column-no-content"]'
    );

    expect(noContent.exists()).toBe(false);
  });
});
