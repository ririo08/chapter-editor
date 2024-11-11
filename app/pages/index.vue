<script setup lang="ts">
const { version } = useVersion()
</script>

<template>
  <div class="max-w-2xl m-auto">
    <h1 class="text-2xl font-bold text-center my-2">YouTube Chapter Editor</h1>
    <div class="text-right text-lg">
      <a href="https://github.com/ririo08/chapter-editor/releases" target="_blank">ver {{ version }}</a>
    </div>
  </div>
</template>

<style scoped></style>
