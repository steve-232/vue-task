import { setActivePinia, createPinia } from "pinia";
import { useHorseStore } from "@/modules/horse/stores/horse";
import { NUMBER_OF_HORSES } from "@/config";

describe("useHorseStore", () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useHorseStore();
  });

  it("should initializes correct default state", () => {
    expect(store.horses).toEqual([]);
  });

  it("should create the correct number of horses, when generateHorses() is called", () => {
    store.generateHorses();

    expect(store.horses.length).toBe(NUMBER_OF_HORSES);
    expect(store.horses[0].id).toBeTruthy();
    expect(store.horses[0].id).toBeTypeOf("number");
    expect(store.horses[0].condition).toBeTruthy();
    expect(store.horses[0].condition).toBeTypeOf("number");
    expect(store.horses[0].name).toBeTruthy();
    expect(store.horses[0].name).toBeTypeOf("string");
    expect(store.horses[0].color).toBeTruthy();
    expect(store.horses[0].color).toBeTypeOf("string");
  });
});
