export const useDuration = () => {
  function formatDuration(duration: number): string {
    // 秒数を整数に切り捨てる
    const totalSeconds = Math.floor(duration)

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    // 分・秒をゼロ埋め
    const formattedMinutes = hours > 0 ? String(minutes) : String(minutes).padStart(1, '0')
    const formattedSeconds = String(seconds).padStart(2, '0')

    if (hours > 0) {
      return `${hours}:${formattedMinutes.padStart(2, '0')}:${formattedSeconds}`
    }
    else {
      return `${formattedMinutes}:${formattedSeconds}`
    }
  }

  return {
    formatDuration,
  }
}
