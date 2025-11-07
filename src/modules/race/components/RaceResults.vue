<template>
  <BaseColumn
    title="Results"
    text-align="center"
    header-bg-color="var(--color-header-race-results)"
    data-testid="race-results-column"
  >
    <BaseText
      v-if="!results.length"
      data-testid="race-results-column-no-content"
      >No Results</BaseText
    >
    <TableScorePosition
      v-else
      v-for="race in results"
      :key="race.id"
      :data="race.participants"
      :title="`${race.title} - ${race.length}m`"
      data-testid="race-results-column-results-table"
    />
  </BaseColumn>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRaceStore } from "@/modules/race/stores/race";
import BaseColumn from "@/components/ui/BaseColumn.vue";
import BaseText from "@/components/ui/BaseText.vue";
import TableScorePosition from "@/components/common/TableScorePosition.vue";

const raceStore = useRaceStore();
const { results } = storeToRefs(raceStore);
</script>
