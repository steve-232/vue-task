<template>
  <table>
    <slot />
  </table>
</template>

<style scoped lang="scss">
table {
  width: 100%;
  border-collapse: collapse;
}
:deep(tr) {
  background-color: var(--color-bg-secondary);
}
:deep(th) {
  padding: 8px;
  text-align: center;
  border: 1px solid var(--color-border-secondary);
  background: var(--color-table-header-bg);
}
:deep(td) {
  padding: 8px;
  text-align: center;
  border: 1px solid var(--color-border-secondary);
}
</style>
