<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate'
import { ulid } from 'ulid'

const { version } = useVersion()
const { formatDuration } = useDuration()
const videoElement = ref<HTMLVideoElement | null>(null)
const controls = useMediaControls(videoElement)
const { playing, currentTime, volume } = controls

const handleFileChange = (files: FileList): void => {
  const file = files ? files[0] : null
  if (file) {
    const url = URL.createObjectURL(file)
    if (videoElement.value) {
      videoElement.value.src = url
      volume.value = 0.5
    }
  }
}

const dropInFile = (file: File) => {
  const url = URL.createObjectURL(file)
  if (videoElement.value) {
    videoElement.value.src = url
    volume.value = 0.5
  }
}

const addAndSubTime = (time: number) => {
  currentTime.value += time
}

const handlePause = (play: boolean) => {
  playing.value = !play
}

const chapters: Ref<Chapter[]> = ref([
  { id: ulid(), time: '0:00', title: '' },
])

const addChapter = () => {
  chapters.value.push({
    id: ulid(),
    time: formatDuration(currentTime.value),
    title: '',
  })
}

const onUpdateTime = (id: string) => {
  const chapter = chapters.value.find(w => w.id === id)!
  chapter.time = formatDuration(currentTime.value)
}

const onDeleteChapter = (id: string) => {
  chapters.value.splice(chapters.value.findIndex(w => w.id === id), 1)
}

const clipboardText: Ref<string> = computed(() => {
  return chapters.value.map(m => `${m.time} ${m.title}`).join('\n')
})
const { copy, copied } = useClipboard()
</script>

<template>
  <div class="max-w-6xl m-auto">
    <h1 class="text-2xl font-bold text-center my-2">
      Video Chapter Editor
    </h1>
    <div class="text-right text-lg">
      <a
        href="https://github.com/ririo08/chapter-editor/releases"
        target="_blank"
      >ver {{ version }}</a>
    </div>

    <section class="flex gap-2 my-2">
      <div class="flex-1">
        <UInput
          type="file"
          accept="video/*"
          icon="i-heroicons-folder"
          @change="handleFileChange"
        />
      </div>
      <div class="flex-none">
        <TemplateSelectModal
          :chapters="chapters"
          @selected="chapters = $event"
        />
      </div>
    </section>

    <div class="grid grid-cols-2 gap-2">
      <div>
        <video
          ref="videoElement"
          controls
          width="100%"
        />
        <div class="font-bold text-right">
          {{ formatDuration(currentTime) }}
        </div>
        <div class="flex gap-2 justify-center mt-2">
          <UButton
            icon="heroicons:backward-solid"
            @click="addAndSubTime(-10)"
          >
            10s
          </UButton>
          <UButton
            icon="heroicons:backward-solid"
            @click="addAndSubTime(-5)"
          >
            5s
          </UButton>
          <UButton
            icon="heroicons:backward-solid"
            @click="addAndSubTime(-1)"
          >
            1s
          </UButton>
          <UButton
            :icon="playing ? 'heroicons:pause-20-solid' : 'heroicons:play-solid'"
            @click="handlePause(playing)"
          />
          <UButton
            icon="heroicons:forward-solid"
            @click="addAndSubTime(1)"
          >
            1s
          </UButton>
          <UButton
            icon="heroicons:forward-solid"
            @click="addAndSubTime(5)"
          >
            5s
          </UButton>
          <UButton
            icon="heroicons:forward-solid"
            @click="addAndSubTime(10)"
          >
            10s
          </UButton>
        </div>
        <div class="flex justify-center mt-2">
          <UButton
            icon="heroicons:plus"
            @click="addChapter"
          >
            Add Chapter
          </UButton>
        </div>
      </div>
      <div>
        <ul
          v-auto-animate
          class="mt-2"
        >
          <li
            v-for="item in chapters"
            :key="item.id"
            class="flex gap-2 mb-2"
          >
            <UInput
              v-model="item.time"
              class="w-[5rem]"
            />
            <UInput
              v-model="item.title"
              class="flex-1"
            />
            <UButton
              icon="heroicons:arrow-path-16-solid"
              @click="onUpdateTime(item.id)"
            />
            <UButton
              color="red"
              icon="heroicons:trash-16-solid"
              @click="onDeleteChapter(item.id)"
            />
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-2">
      <h2 class="text-xl text-center">
        result
      </h2>
      <div class="flex justify-end">
        <UButton
          class="mb-2"
          :icon="copied ? 'heroicons:check-16-solid' : 'heroicons:clipboard-16-solid'"
          @click="copy(clipboardText)"
        >
          Copy
        </UButton>
      </div>
      <pre class="bg-gray-200 p-4">{{ clipboardText }}</pre>
    </div>
    <DropzoneMask @selected="dropInFile" />
  </div>
</template>

<style scoped></style>
