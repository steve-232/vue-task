import { mount } from "@vue/test-utils";
import BaseColumn from "@/components/ui/BaseColumn.vue";
import BaseTitle from "@/components/ui/BaseTitle.vue";

describe("BaseColumn.vue", () => {
  it("should render the column section", () => {
    const wrapper = mount(BaseColumn);
    const section = wrapper.find("section.column");

    expect(section.exists()).toBe(true);
  });

  it("should not render header when title is empty", () => {
    const wrapper = mount(BaseColumn, {
      props: { title: "" },
    });

    expect(wrapper.find("[data-testid='column-header']").exists()).toBe(false);
  });

  it("should render header and BaseTitle when title is provided", () => {
    const wrapper = mount(BaseColumn, {
      props: { title: "My Column" },
      global: {
        stubs: { BaseTitle },
      },
    });

    const header = wrapper.find("[data-testid='column-header']");
    const title = wrapper.findComponent(BaseTitle);

    expect(header.exists()).toBe(true);
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("My Column");
  });

  it("should apply textAlign and headerBgColor styles", () => {
    const wrapper = mount(BaseColumn, {
      props: {
        title: "Styled Header",
        textAlign: "center",
        headerBgColor: "red",
      },
      global: {
        stubs: { BaseTitle },
      },
    });

    const header = wrapper.find("[data-testid='column-header']");
    expect(header.attributes("style")).toContain("text-align: center");
    expect(header.attributes("style")).toContain("background-color: red");
  });

  it("should render slot content inside column__content", () => {
    const wrapper = mount(BaseColumn, {
      slots: {
        default: "<p>Column body content</p>",
      },
    });

    const content = wrapper.find("[data-testid='column-content']");
    expect(content.exists()).toBe(true);
    expect(content.text()).toBe("Column body content");
  });

  it("should have default prop values when not provided", () => {
    const wrapper = mount(BaseColumn);
    const vm = wrapper.vm;

    expect(vm.title).toBe("");
    expect(vm.textAlign).toBe("left");
    expect(vm.headerBgColor).toBe("#fff");
  });
});
