import * as React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ChakraProvider } from '@chakra-ui/react'

import configureStore from './store'

import MainPage from './pages/Main'
import FeedsPage from './pages/Feeds'
import SchedulesPage from './pages/Schedules'
import SearchPage from './pages/Search'
import AnimePage from './pages/Anime'

import Header from './presets/Header'
import Footer from './presets/Footer'
import theme from './styles/theme'

import './styles/fixupWordBreak.css'
import './styles/fontOverrides.css'

const { store, persistor } = configureStore()

const App = props => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Router>
            <Header />

            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/schedules' component={SchedulesPage} />
              <Route exact path='/feeds/:page' component={FeedsPage} />
              <Route exact path='/search' component={SearchPage} />
              <Route exact path='/search/:keyword' component={SearchPage} />
              <Route exact path='/anime/:id' component={AnimePage} />
              <Redirect from='/feeds' to='/feeds/1' />
              {
                // NOTE: fallback to /feeds when user opens the old page schema;
              }
              <Redirect from='/page' to='/feeds' />
              <Redirect from='/page/:id' to='/feeds/:id' />
              <Redirect from='/series/:name' to='/search/:name' />
            </Switch>

            <Footer />
          </Router>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
