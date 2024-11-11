<script setup lang="ts">
import { useMediaControls } from '@vueuse/core'

const videoElement = ref<HTMLVideoElement | null>(null)
const controls = useMediaControls(videoElement)
const { playing } = controls

const handleFileChange = (files: FileList): void => {
  const file = files ? files[0] : null
  console.log(file)
  if (file) {
    const url = URL.createObjectURL(file)
    if (videoElement.value) {
      videoElement.value.src = url
    }
  }
}
</script>

<template>
  <div>
    <UInput
      type="file"
      accept="video/*"
      icon="i-heroicons-folder"
      @change="handleFileChange"
    />
    <video
      ref="videoElement"
      controls
      width="600"
    />
    <div>
      <UButton
        icon="i-carbon-play"
        @click="playing = !playing"
      >
      <!-- <i v-if="!playing" class="inline-block align-middle i-carbon-play" />
      <i v-else class="i-carbon-pause inline-block align-middle" /> -->
      </UButton>
    </div>
  </div>
</template>

<style scoped></style>
