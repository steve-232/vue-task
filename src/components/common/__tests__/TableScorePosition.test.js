import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import TableScorePosition from "@/components/common/TableScorePosition.vue";

const sampleData = [
  { id: 1, position: 1, name: "John" },
  { id: 2, position: 2, name: "Jane" },
];

describe("TableScorePosition.vue", () => {
  it("should render header when title is provided", () => {
    const wrapper = mount(TableScorePosition, {
      props: { title: "Race Results", data: [] },
    });
    const header = wrapper.get('[data-testid="table-score-position-header"]');
    const title = wrapper.get('[data-testid="table-score-position-title"]');

    expect(header.exists()).toBe(true);
    expect(title.text()).toBe("Race Results");
  });

  it("should not render header when title is empty", () => {
    const wrapper = mount(TableScorePosition, {
      props: { title: "", data: [] },
    });
    expect(
      wrapper.find('[data-testid="table-score-position-header"]').exists()
    ).toBe(false);
  });

  it("should render header row", () => {
    const wrapper = mount(TableScorePosition, { props: { data: [] } });
    const table = wrapper.get('[data-testid="table-score-position-table"]');
    const headerRow = wrapper.get(
      '[data-testid="table-score-position-header-row"]'
    );

    expect(table.exists()).toBe(true);
    expect(headerRow.text()).toContain("Position");
    expect(headerRow.text()).toContain("Name");
  });

  it("should render all rows based on data prop", () => {
    const wrapper = mount(TableScorePosition, { props: { data: sampleData } });
    const row1 = wrapper.get('[data-testid="table-score-position-row-1"]');
    const row2 = wrapper.get('[data-testid="table-score-position-row-2"]');

    expect(row1.exists()).toBe(true);
    expect(row2.exists()).toBe(true);

    expect(row1.text()).toContain(sampleData[0].position);
    expect(row1.text()).toContain(sampleData[0].name);
    expect(row2.text()).toContain(sampleData[1].position);
    expect(row2.text()).toContain(sampleData[1].name);
  });

  it("should render no data rows if data prop is empty", () => {
    const wrapper = mount(TableScorePosition, { props: { data: [] } });
    const dataRows = wrapper.findAll(
      '[data-testid^="table-score-position-row-"]'
    );
    expect(dataRows.length).toBe(0);
  });
});
