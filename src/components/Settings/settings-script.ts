export const getThemeSettingScript = () => {
  return `
    const theme = localStorage.theme
    
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      if (!document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.add('dark')
      }
    } else {
      document.documentElement.classList.remove('dark')
    }
  `
}
