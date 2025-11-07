import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TheHeader from "@/components/layout/TheHeader.vue";

const PlayState = {
  RUNNING: "Running",
  PAUSED: "Paused",
};

const raceStoreMock = {
  generateRaceSchedule: vi.fn(),
  raceSchedule: [],
};

const generalStoreMock = {
  playState: PlayState.PAUSED,
  togglePlayState: vi.fn(),
};

vi.mock("@/modules/race/stores/race", () => ({
  useRaceStore: vi.fn(() => raceStoreMock),
}));

vi.mock("@/stores/general", () => ({
  useGeneralStore: vi.fn(() => generalStoreMock),
}));

describe("TheHeader.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    raceStoreMock.raceSchedule = [];
    generalStoreMock.playState = PlayState.PAUSED;
  });

  it("should render the title correctly", () => {
    const wrapper = mount(TheHeader);
    const title = wrapper.get('[data-testid="page-header-title"]');
    expect(title.text()).toBe("Horse Racing");
  });

  it("should render both buttons", () => {
    const wrapper = mount(TheHeader);
    expect(
      wrapper.get('[data-testid="page-header-generate-program-btn"]').exists()
    ).toBe(true);
    expect(
      wrapper.get('[data-testid="page-header-start-stop-btn"]').exists()
    ).toBe(true);
  });

  it("should call raceStore.generateRaceSchedule when Generate Program is clicked", async () => {
    const wrapper = mount(TheHeader);
    const generateBtn = wrapper.get(
      '[data-testid="page-header-generate-program-btn"]'
    );

    await generateBtn.trigger("click");
    expect(raceStoreMock.generateRaceSchedule).toHaveBeenCalledTimes(1);
  });

  it("should call generalStore.togglePlayState when Start/Pause is clicked", async () => {
    raceStoreMock.raceSchedule = [{ id: 1 }];
    const wrapper = mount(TheHeader);
    const startStopBtn = wrapper.get(
      '[data-testid="page-header-start-stop-btn"]'
    );

    await startStopBtn.trigger("click");

    await expect(generalStoreMock.togglePlayState).toHaveBeenCalledTimes(1);
  });

  it("should disable Start/Pause button when raceSchedule is empty", () => {
    raceStoreMock.raceSchedule = [];
    const wrapper = mount(TheHeader);
    const startStopBtn = wrapper.get(
      '[data-testid="page-header-start-stop-btn"]'
    );
    expect(startStopBtn.attributes("disabled")).toBeDefined();
  });

  it("should enable Start/Pause button when raceSchedule has items", () => {
    raceStoreMock.raceSchedule = [{ id: 1 }];
    const wrapper = mount(TheHeader);
    const startStopBtn = wrapper.get(
      '[data-testid="page-header-start-stop-btn"]'
    );
    expect(startStopBtn.attributes("disabled")).toBeUndefined();
  });

  it('should show "Start" when playState is PAUSED', () => {
    generalStoreMock.playState = PlayState.PAUSED;
    const wrapper = mount(TheHeader);
    const startStopBtn = wrapper.get(
      '[data-testid="page-header-start-stop-btn"]'
    );
    expect(startStopBtn.text()).toBe("Start");
  });

  it('should show "Pause" when playState is RUNNING', () => {
    generalStoreMock.playState = PlayState.RUNNING;
    const wrapper = mount(TheHeader);
    const startStopBtn = wrapper.get(
      '[data-testid="page-header-start-stop-btn"]'
    );
    expect(startStopBtn.text()).toBe("Pause");
  });
});
