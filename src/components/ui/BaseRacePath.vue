<template>
  <section class="race-path" data-testid="race-path">
    <div class="race-path__label" data-testid="race-path-label" v-if="label">
      {{ label }}
    </div>
    <div class="race-path__content">
      <span
        class="race-path__runner"
        data-testid="race-path-runner"
        :style="[
          {
            animationDuration: `${animationDuration}ms`,
            animationPlayState: `${stopAnimation ? 'paused' : 'running'}`,
          },
        ]"
        @animationend="handleAnimationEnd"
        ><slot
      /></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useGeneralStore } from "@/stores/general";
import { PlayState } from "@/ts";

interface Props {
  label?: string;
  animationDuration: number;
}

const { label, animationDuration } = defineProps<Props>();

const emit = defineEmits<{
  animationEnd: [];
}>();

const generalStore = useGeneralStore();

const stopAnimation = computed(() => {
  return generalStore.playState === PlayState.PAUSED;
});

const handleAnimationEnd = () => {
  emit("animationEnd");
};
</script>

<style scoped lang="scss">
.race-path {
  position: relative;
  display: flex;
  height: 70px;

  &__label {
    padding: 0 10px;
    text-align: center;
    writing-mode: sideways-lr;
    font-weight: 600;
    color: var(--color-secondary);
    border: 2px solid var(--color-secondary);
    border-bottom-width: 0;
    background-color: var(--color-success);
  }
  &__content {
    position: relative;
    display: flex;
    align-items: center;
    flex-grow: 1;
    border-top: 2px dashed var(--color-primary);
  }
  &__runner {
    position: absolute;
    animation: running ease-in forwards;
  }
}

@keyframes running {
  from {
    left: 0;
  }
  to {
    left: 100%;
  }
}
</style>
