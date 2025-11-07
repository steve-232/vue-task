import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import RaceHorse from "@/modules/race/components/RaceHorse.vue";

const PlayState = {
  RUNNING: "Running",
  PAUSED: "Paused",
};

const sampleHorse = {
  id: 1,
  name: "Thunder",
  color: "red",
  condition: 80,
};

const generalStoreMock = {
  playState: PlayState.PAUSED,
  togglePlayState: vi.fn(),
};

vi.mock("@/stores/general", () => ({
  useGeneralStore: vi.fn(() => generalStoreMock),
}));

describe("RaceHorse.vue", () => {
  it("should render the horse icon with correct color", () => {
    const wrapper = mount(RaceHorse, {
      props: { horse: sampleHorse },
    });
    const icon = wrapper.get('[data-testid="race-horse-icon"]');

    expect(icon.attributes("color")).toBe(sampleHorse.color);
  });

  it("should render the provided label if passed as prop", () => {
    const wrapper = mount(RaceHorse, {
      props: { horse: sampleHorse, label: "Runner 1" },
    });

    expect(wrapper.props("label")).toBe("Runner 1");
  });
});
