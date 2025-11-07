import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import HorseTable from "@/modules/horse/components/HorseTable.vue";

const sampleData = [
  { id: 1, name: "Thunder", condition: "30", color: "red" },
  { id: 2, name: "Blaze", condition: "80", color: "blue" },
];

describe("HorseTable.vue", () => {
  it("should render the table with correct header", () => {
    const wrapper = mount(HorseTable, { props: { data: sampleData } });

    const headerRow = wrapper.get('[data-testid="horse-table-header-row"]');
    const headers = headerRow.findAll("th").map((th) => th.text());

    expect(headers).toEqual(["Name", "Condition", "Color"]);
  });

  it("should render a row for each horse", () => {
    const wrapper = mount(HorseTable, { props: { data: sampleData } });
    const rows = wrapper.findAll('tr[data-testid^="horse-table-row-"]');
    expect(rows).toHaveLength(sampleData.length);
  });

  it("should render correct horse data in each row", () => {
    const wrapper = mount(HorseTable, { props: { data: sampleData } });

    sampleData.forEach((horse) => {
      const row = wrapper.get(`[data-testid="horse-table-row-${horse.id}"]`);
      const cells = row.findAll("td").map((td) => td.text());

      expect(cells).toEqual([horse.name, horse.condition, horse.color]);
    });
  });

  it("should apply color style for each horse color cell", () => {
    const wrapper = mount(HorseTable, { props: { data: sampleData } });

    sampleData.forEach((horse) => {
      const row = wrapper.get(`[data-testid="horse-table-row-${horse.id}"]`);
      const colorCell = row.findAll("td")[2];
      expect(colorCell.attributes("style")).toContain(`color: ${horse.color}`);
    });
  });
});
