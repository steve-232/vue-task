import { mount } from "@vue/test-utils";
import BaseTitle from "@/components/ui/BaseTitle.vue";

describe("BaseTitle.vue", () => {
  it("should render with default tag 'h1'", () => {
    const wrapper = mount(BaseTitle, {
      slots: {
        default: "Main Title",
      },
    });

    const el = wrapper.find("h1");
    expect(el.exists()).toBe(true);
    expect(el.text()).toBe("Main Title");
  });

  it("should render with provided valid tag", () => {
    const wrapper = mount(BaseTitle, {
      props: { tag: "h3" },
      slots: {
        default: "Section Title",
      },
    });

    const el = wrapper.find("h3");
    expect(el.exists()).toBe(true);
    expect(el.text()).toBe("Section Title");
  });

  it("should render nothing when no slot content is provided", () => {
    const wrapper = mount(BaseTitle);
    expect(wrapper.text()).toBe("");
  });
});
