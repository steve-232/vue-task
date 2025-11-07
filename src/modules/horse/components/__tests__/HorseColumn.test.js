import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HorseColumn from "@/modules/horse/components/HorseColumn.vue";
import { NUMBER_OF_HORSES } from "@/config";

const horseStoreMock = {
  generateHorses: vi.fn(),
  horses: [
    { id: 1, name: "Thunder", condition: "30", color: "red" },
    { id: 2, name: "Blaze", condition: "80", color: "blue" },
  ],
};

vi.mock("@/modules/horse/stores/horse", () => ({
  useHorseStore: vi.fn(() => horseStoreMock),
}));

vi.mock("pinia", () => ({
  storeToRefs: (store) => ({
    horses: store.horses,
  }),
}));

describe("HorseColumn.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render correct title", () => {
    const wrapper = mount(HorseColumn);

    expect(wrapper.get("header").text()).toBe(
      `Horse List (1 - ${NUMBER_OF_HORSES})`
    );
  });

  it("should render all rows", () => {
    const wrapper = mount(HorseColumn);
    const table = wrapper.get("table");

    expect(table.findAll("tr").length).toBe(horseStoreMock.horses.length + 1);
  });
});
