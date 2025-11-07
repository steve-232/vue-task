import { mount } from "@vue/test-utils";
import BaseText from "@/components/ui/BaseText.vue";

describe("BaseText.vue", () => {
  it("should render with default tag 'p'", () => {
    const wrapper = mount(BaseText, {
      slots: {
        default: "Hello world",
      },
    });

    const el = wrapper.find("p");
    expect(el.exists()).toBe(true);
    expect(el.text()).toBe("Hello world");
  });

  it("should render with provided valid tag", () => {
    const wrapper = mount(BaseText, {
      props: { tag: "span" },
      slots: {
        default: "Inline text",
      },
    });

    const el = wrapper.find("span");
    expect(el.exists()).toBe(true);
    expect(el.text()).toBe("Inline text");
  });

  it("should render nothing when no slot content is provided", () => {
    const wrapper = mount(BaseText);
    expect(wrapper.text()).toBe("");
  });
});
