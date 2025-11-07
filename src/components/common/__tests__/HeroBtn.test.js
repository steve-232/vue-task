import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import HeroBtn from "@/components/common/HeroBtn.vue";

describe("HeroBtn.vue", () => {
  it("should render default slot content", () => {
    const wrapper = mount(HeroBtn, {
      slots: {
        default: "Click Me",
      },
    });

    expect(wrapper.text()).toBe("Click Me");
  });

  it("should set default props correctly", () => {
    const wrapper = mount(HeroBtn);

    expect(wrapper.attributes("type")).toBe("button");
    expect(wrapper.attributes("disabled")).toBeUndefined();
  });

  it("should apply provided type prop", () => {
    const wrapper = mount(HeroBtn, {
      props: { type: "submit" },
    });

    expect(wrapper.attributes("type")).toBe("submit");
  });

  it("should disable button when disabled prop is true", () => {
    const wrapper = mount(HeroBtn, {
      props: { disabled: true },
    });

    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("should disable button when loading prop is true", () => {
    const wrapper = mount(HeroBtn, {
      props: { loading: true },
    });

    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("should show 'Loading...' when loading is true", () => {
    const wrapper = mount(HeroBtn, {
      props: { loading: true },
      slots: {
        default: "Click Me",
      },
    });

    expect(wrapper.text()).toContain("Loading...");
    expect(wrapper.text()).not.toContain("Click Me");
  });
});
