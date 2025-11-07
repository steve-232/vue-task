import { mount } from "@vue/test-utils";
import BaseTable from "@/components/ui/BaseTable.vue";

describe("BaseTable.vue", () => {
  it("should render a table element", () => {
    const wrapper = mount(BaseTable);
    const table = wrapper.find("table");

    expect(table.exists()).toBe(true);
  });

  it("should render slot content inside the table", () => {
    const wrapper = mount(BaseTable, {
      slots: {
        default: "<tr><td>Row 1</td></tr>",
      },
    });

    const table = wrapper.find("table");
    expect(table.html()).toContain("<td>Row 1</td>");
  });

  it("should render empty table when no slot is provided", () => {
    const wrapper = mount(BaseTable);
    expect(wrapper.find("table").html()).not.toContain("<td>");
  });
});
