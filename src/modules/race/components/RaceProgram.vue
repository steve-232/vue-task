<template>
  <BaseColumn
    title="Program"
    text-align="center"
    header-bg-color="var(--color-header-race-program)"
    data-testid="race-program-column"
  >
    <BaseText
      v-if="!raceSchedule.length"
      data-testid="race-program-column-no-content"
      >No Program</BaseText
    >
    <TableScorePosition
      v-else
      v-for="race in raceSchedule"
      :key="race.id"
      :data="race.participants"
      :title="`${race.title} - ${race.length}m`"
      data-testid="race-program-column-schedule-table"
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
const { raceSchedule } = storeToRefs(raceStore);
</script>
