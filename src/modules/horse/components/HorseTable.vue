<template>
  <BaseTable data-testid="horse-table">
    <tr data-testid="horse-table-header-row">
      <th>Name</th>
      <th>Condition</th>
      <th>Color</th>
    </tr>
    <tr
      v-for="horse in data"
      :key="horse.id"
      :data-testid="`horse-table-row-${horse.id}`"
    >
      <td>{{ horse.name }}</td>
      <td>{{ horse.condition }}</td>
      <td :style="[{ color: horse.color }]">{{ horse.color }}</td>
    </tr>
  </BaseTable>
</template>

<script setup lang="ts">
import BaseTable from "@/components/ui/BaseTable.vue";
import type { Horse } from "@/modules/horse/ts";

interface Props {
  data: Horse[];
}

defineProps<Props>();
</script>
