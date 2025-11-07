import { mount } from "@vue/test-utils";
import BaseBtn from "@/components/ui/BaseBtn.vue";

describe("BaseBtn.vue", () => {
  it("should render default slot content", () => {
    const wrapper = mount(BaseBtn, {
      slots: {
        default: "Click Me",
      },
    });

    expect(wrapper.text()).toBe("Click Me");
  });

  it("should set default props correctly", () => {
    const wrapper = mount(BaseBtn);
    const button = wrapper.find("button");

    expect(button.attributes("type")).toBe("button");
    expect(button.attributes("disabled")).toBeUndefined();
  });

  it("should apply provided type prop", () => {
    const wrapper = mount(BaseBtn, {
      props: { type: "submit" },
    });

    expect(wrapper.attributes("type")).toBe("submit");
  });

  it("should disable button when disabled prop is true", () => {
    const wrapper = mount(BaseBtn, {
      props: { disabled: true },
    });

    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("should disable button when loading prop is true", () => {
    const wrapper = mount(BaseBtn, {
      props: { loading: true },
    });

    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("should show 'Loading...' when loading is true", () => {
    const wrapper = mount(BaseBtn, {
      props: { loading: true },
      slots: {
        default: "Click Me",
      },
    });

    expect(wrapper.text()).toContain("Loading...");
    expect(wrapper.text()).not.toContain("Click Me");
  });
});
