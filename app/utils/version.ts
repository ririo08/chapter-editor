export const useVersion = () => {
  const config = useRuntimeConfig()
  const version = config.public.appVersion
  return {
    version
  }
} 