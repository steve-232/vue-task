import { pickAndRemove } from "@/utils/pickAndRemove";

describe("pickAndRemove", () => {
  it("should pick a random value from the array, remove it from the array, and return it", () => {
    const vals = [1, 2, 3];
    const arr = [...vals];

    const returnedVal1 = pickAndRemove(arr);
    expect(arr.length).toBe(2);
    expect(returnedVal1).toBeOneOf([...vals]);

    const returnedVal2 = pickAndRemove(arr);
    expect(arr.length).toBe(1);
    expect(returnedVal2).toBeOneOf([...vals]);

    const returnedVal3 = pickAndRemove(arr);
    expect(arr.length).toBe(0);
    expect(returnedVal3).toBeOneOf([...vals]);
  });
});
