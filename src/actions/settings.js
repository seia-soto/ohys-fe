export const SET_LANGUAGE = 'settings/setLanguage'

export const setLanguage = language => {
  return {
    type: SET_LANGUAGE,
    payload: {
      language
    }
  }
}
