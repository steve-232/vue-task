import { generateRandomNumber } from "@/utils/generateRandomNumber";

describe("generateRandomNumber", () => {
  it("should return a number within the given range (inclusive)", () => {
    const from = 1;
    const to = 10;
    for (let i = 0; i < 100; i++) {
      const result = generateRandomNumber(from, to);
      expect(result).toBeGreaterThanOrEqual(from);
      expect(result).toBeLessThanOrEqual(to);
    }
  });

  it("should return the same number when from and to are equal", () => {
    expect(generateRandomNumber(5, 5)).toBe(5);
  });

  it("should return the lower bound when Math.random() returns 0", () => {
    const spy = vi.spyOn(Math, "random").mockReturnValue(0);
    expect(generateRandomNumber(10, 20)).toBe(10);
    spy.mockRestore();
  });

  it("should return the upper bound when Math.random() returns almost 1", () => {
    const spy = vi.spyOn(Math, "random").mockReturnValue(0.999999);
    expect(generateRandomNumber(10, 20)).toBe(20);
    spy.mockRestore();
  });
});
