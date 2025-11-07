<template>
  <div class="table-score-position" data-testid="table-score-position">
    <header
      v-if="title?.length"
      class="table-score-position__header"
      data-testid="table-score-position-header"
    >
      <BaseTitle tag="h4" data-testid="table-score-position-title">{{
        title
      }}</BaseTitle>
    </header>
    <BaseTable data-testid="table-score-position-table">
      <tr data-testid="table-score-position-header-row">
        <th>Position</th>
        <th>Name</th>
      </tr>
      <tr
        v-for="item in data"
        :key="item.id"
        :data-testid="`table-score-position-row-${item.id}`"
      >
        <td data-testid="table-score-position-cell-position">
          {{ item.position }}
        </td>
        <td data-testid="table-score-position-cell-name">{{ item.name }}</td>
      </tr>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import BaseTable from "@/components/ui/BaseTable.vue";
import BaseTitle from "@/components/ui/BaseTitle.vue";
import type { TableScorePositionItem } from "@/ts";

interface Props {
  data: TableScorePositionItem[];
  title?: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.table-score-position {
  &__header {
    padding: 8px 0;
    text-align: center;
    background-color: var(--color-header-bg-secondary);
  }
}
</style>
