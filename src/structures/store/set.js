import get from './get'

export default data => {
  const settings = get()
  const settingNames = Object.keys(settings)

  for (let i = 0; i < settingNames.length; i++) {
    settings[settingNames[i]] = data[settingNames[i]] || settings[settingNames[i]]
  }

  window.localStorage.setItem('settings', JSON.stringify(settings))
}
