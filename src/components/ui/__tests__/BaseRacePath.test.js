import { mount } from "@vue/test-utils";
import { vi } from "vitest";
import BaseRacePath from "@/components/ui/BaseRacePath.vue";
import { useGeneralStore } from "@/stores/general";

const PlayState = {
  RUNNING: "Running",
  PAUSED: "Paused",
};

vi.mock("@/stores/general", () => ({
  useGeneralStore: vi.fn(),
}));

describe("BaseRacePath.vue", () => {
  let mockStore;

  beforeEach(() => {
    mockStore = { playState: PlayState.RUNNING };
    useGeneralStore.mockReturnValue(mockStore);
  });

  it("should render race path section", () => {
    const wrapper = mount(BaseRacePath, {
      props: { animationDuration: 1000 },
    });

    expect(wrapper.find("[data-testid='race-path']").exists()).toBe(true);
  });

  it("should render label when provided", () => {
    const wrapper = mount(BaseRacePath, {
      props: { label: "Race 1", animationDuration: 1000 },
    });

    const label = wrapper.find("[data-testid='race-path-label']");
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe("Race 1");
  });

  it("should not render label when not provided", () => {
    const wrapper = mount(BaseRacePath, {
      props: { animationDuration: 1000 },
    });

    expect(wrapper.find("[data-testid='race-path-label']").exists()).toBe(
      false
    );
  });

  it("should apply animation duration style to runner", () => {
    const wrapper = mount(BaseRacePath, {
      props: { animationDuration: 2000 },
    });

    const runner = wrapper.find("[data-testid='race-path-runner']");
    expect(runner.attributes("style")).toContain("animation-duration: 2000ms");
  });

  it("should pause animation when playState is PAUSED", async () => {
    mockStore.playState = PlayState.PAUSED;

    const wrapper = mount(BaseRacePath, {
      props: { animationDuration: 1000 },
    });

    const runner = wrapper.find("[data-testid='race-path-runner']");
    expect(runner.attributes("style")).toContain(
      "animation-play-state: paused"
    );
  });

  it("should emit 'animationEnd' when animation ends", async () => {
    const wrapper = mount(BaseRacePath, {
      props: { animationDuration: 1000 },
    });

    const runner = wrapper.find("[data-testid='race-path-runner']");

    await runner.trigger("animationend");
    expect(wrapper.emitted("animationEnd")).toBeTruthy();
    expect(wrapper.emitted("animationEnd").length).toBe(1);
  });

  it("should render slot content inside runner", () => {
    const wrapper = mount(BaseRacePath, {
      props: { animationDuration: 1000 },
      slots: {
        default: "<span>Horse</span>",
      },
    });

    expect(wrapper.html()).toContain("Horse");
  });
});
