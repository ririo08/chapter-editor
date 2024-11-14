<script setup lang="ts">
import { format } from 'date-fns'

const props = defineProps<{
  chapters: Chapter[]
}>()

const emits = defineEmits<{
  (event: 'selected', value: Chapter[]): void
}>()

const isOpen = ref(false)
const { saves } = useSaves()

const name = ref('')
const onSaveChapter = () => {
  saves.value.push({
    name: name.value,
    chapters: props.chapters,
  })
}

const onDeleteChapter = (index: number) => {
  saves.value.splice(index, 1)
}

const onSelectChapterTemplate = (index: number) => {
  emits('selected', saves.value[index]!.chapters!)
  isOpen.value = false
}

const onExport = () => {
  const stringified = JSON.stringify(saves.value)
  const blob = new Blob([stringified], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `chapter-template_${format(new Date(), 'yyyyMMddHHmmss')}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const fileInputRef: Ref<HTMLInputElement | null> = ref(null)
const onImport = () => {
  fileInputRef.value?.click()
}
const onSelectedFile = (event: Event) => {
  if (event.target) {
    const element = event.target as HTMLInputElement
    const fileJson = element.files ? element.files[0] : undefined
    if (fileJson) {
      const reader = new FileReader()
      reader.readAsText(fileJson)
      reader.addEventListener('load', () => {
        saves.value = JSON.parse(reader.result as string)
      })
    }
  }
}
</script>

<template>
  <div>
    <UButton
      label="Load Template"
      icon="heroicons:archive-box"
      trailing
      @click="isOpen = true"
    />

    <UModal v-model="isOpen">
      <UCard>
        <div class="p-4">
          <p>Since local storage is erased periodically, it is recommended to keep backups.</p>
          <section class="max-h-96 overflow-auto">
            <template
              v-for="(save, index) of saves"
              :key="index"
            >
              <div class="flex gap-2">
                <p class="font-bold self-center flex-1">
                  {{ !!save.name ? save.name : 'no name' }}
                </p>
                <UButton
                  label="Use"
                  icon="heroicons:check-16-solid"
                  @click="onSelectChapterTemplate(index)"
                />
                <UButton
                  color="red"
                  icon="heroicons:trash-16-solid"
                  @click="onDeleteChapter(index)"
                />
              </div>
              <UDivider
                v-if="index + 1 !== saves.length"
                class="my-2"
              />
            </template>
          </section>
        </div>
        <template #footer>
          <section class="flex gap-2 justify-end">
            <UInput
              v-model="name"
              placeholder="name"
            />
            <UButton
              label="Save Chapter"
              icon="heroicons:arrow-down-circle-16-solid"
              @click="onSaveChapter"
            />
            <UButton
              label="Export"
              icon="heroicons:arrow-down-tray-16-solid"
              @click="onExport"
            />
            <UButton
              label="Import"
              icon="heroicons:arrow-up-tray-16-solid"
              @click="onImport"
            />
            <input
              ref="fileInputRef"
              type="file"
              accept=".json"
              class="hidden"
              @change="onSelectedFile"
            >
          </section>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
