import { createStore, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from '../reducers'

const persistConfig = {
  key: 'ohys',
  whitelist: [
    'settings'
  ],
  storage
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const enhancedReducer = persistReducer(persistConfig, rootReducer)

export default initialState => {
  const store = createStore(enhancedReducer, initialState, composeEnhancers())
  const persistor = persistStore(store)

  return { store, persistor }
}
