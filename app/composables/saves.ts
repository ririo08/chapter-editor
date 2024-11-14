import { useStorage } from '@vueuse/core'

export type Chapter = {
  id: string
  time: string
  title: string
}

type ChapterList = {
  name: string
  chapters: Chapter[]
}

export const useSaves = () => {
  const saves = useStorage<ChapterList[]>('saves', [])

  return {
    saves,
  }
}
