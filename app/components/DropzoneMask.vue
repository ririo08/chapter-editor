<script setup lang="ts">
const emits = defineEmits<{
  (event: 'selected', value: File): void
}>()

// dropMask 要素の参照
const dropMask = ref<HTMLDivElement | null>(null)

// dragover イベントの設定
useEventListener(document.body, 'dragover', (e: DragEvent) => {
  e.stopPropagation()
  e.preventDefault()
  if (dropMask.value) {
    dropMask.value.classList.remove('hidden')
    const overlay = document.getElementById('overlay')
    if (overlay) {
      overlay.classList.remove('hidden')
      overlay.classList.add('opacity-100')
    }
  }
})

// dragleave イベントの設定
useEventListener(dropMask, 'dragleave', (e: DragEvent) => {
  e.stopPropagation()
  e.preventDefault()
  if (dropMask.value) {
    dropMask.value.classList.add('hidden')
    const overlay = document.getElementById('overlay')
    if (overlay) {
      overlay.classList.remove('opacity-100')
      setTimeout(() => {
        overlay.classList.add('hidden')
      }, 300)
    }
  }
})

// drop イベントの設定
useEventListener(dropMask, 'drop', (e: DragEvent) => {
  e.stopPropagation()
  e.preventDefault()
  if (dropMask.value) {
    dropMask.value.classList.add('hidden')
    const overlay = document.getElementById('overlay')
    if (overlay) {
      overlay.classList.remove('opacity-100')
      setTimeout(() => {
        overlay.classList.add('hidden')
      }, 300)
    }

    // ドロップされたファイルを取得
    const files = e.dataTransfer?.files
    if (files?.length && files[0]) {
      emits('selected', files[0])
    }
  }
})
</script>

<template>
  <div
    ref="dropMask"
    class="fixed top-0 left-0 w-full h-full opacity-0 hidden z-[9999]"
  />
  <div
    id="overlay"
    class="fixed top-0 left-0 w-full h-full hidden flex justify-center items-center opacity-100 transition-opacity duration-300 bg-gray-800/50"
  >
    <span class="text-3xl font-bold align-middle text-white">Drop Video<UIcon name="heroicons:arrow-up-tray-16-solid" /></span>
  </div>
</template>

<style scoped>
#overlay {
  transition: opacity 0.3s;
}
</style>
