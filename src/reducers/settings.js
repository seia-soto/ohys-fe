import * as settingsActions from '../actions/settings'

const initialStates = {
  language: 'en'
}

const reducer = (state = initialStates, action) => {
  const { type, payload } = action

  switch (type) {
    case settingsActions.SET_LANGUAGE: {
      const fallback =
        (!payload.language) ||
        (payload.language.length !== 2)
      if (fallback) payload.language = 'en'

      return {
        language: (payload.language || 'en').toLowerCase()
      }
    }
    default:
      return state
  }
}

export default reducer
