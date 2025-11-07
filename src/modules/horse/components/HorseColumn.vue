<template>
  <BaseColumn
    :title="`Horse List (1 - ${NUMBER_OF_HORSES})`"
    header-bg-color="var(--color-header-horse-list)"
  >
    <HorseTable :data="horses" />
  </BaseColumn>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useHorseStore } from "@/modules/horse/stores/horse";
import { NUMBER_OF_HORSES } from "@/config";
import BaseColumn from "@/components/ui/BaseColumn.vue";
import HorseTable from "@/modules/horse/components/HorseTable.vue";

const generalStore = useHorseStore();
const { horses } = storeToRefs(generalStore);

onBeforeMount(() => generalStore.generateHorses());
</script>
