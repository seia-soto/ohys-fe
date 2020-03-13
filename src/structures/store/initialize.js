const localStorage = window.localStorage

const reset = () => {
  const settings = {}

  settings.language = (navigator.language || navigator.userLanguage || 'en').slice(0, 2)

  localStorage.setItem('settings', JSON.stringify(settings))

  return settings
}

export default force => {
  const payload = localStorage.getItem('settings')

  if (force || payload === null) {
    return reset()
  }

  try {
    const settings = JSON.parse(payload)

    return settings
  } catch (error) {
    return reset()
  }
}
