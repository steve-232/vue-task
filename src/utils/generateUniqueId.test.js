import { generateUniqueId } from "@/utils/generateUniqueId";

describe("generateUniqueId", () => {
  it("should return a number", () => {
    const id = generateUniqueId();
    expect(typeof id).toBe("number");
    expect(Number.isFinite(id)).toBe(true);
  });

  it("should return different values on multiple calls", () => {
    const ids = new Set();
    for (let i = 0; i < 50; i++) {
      ids.add(generateUniqueId());
    }
    expect(ids.size).toBe(50);
  });
});
