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

import Header from './presets/Header'
import Footer from './presets/Footer'
import theme from './styles/theme'

import './styles/fixupWordBreak.css'
import './styles/fontOverrides.css'

const { store, persistor } = configureStore()

const MainPage = React.lazy(() => import('./pages/Main'))
const FeedsPage = React.lazy(() => import('./pages/Feeds'))
const SchedulesPage = React.lazy(() => import('./pages/Schedules'))
const SearchPage = React.lazy(() => import('./pages/Search'))
const AnimePage = React.lazy(() => import('./pages/Anime'))

const App = props => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Router>
            <Header />

            <React.Suspense fallback={null}>
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
            </React.Suspense>

            <Footer />
          </Router>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
