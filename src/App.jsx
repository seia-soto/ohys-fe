import * as React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import FeedsPage from './pages/Feeds'
import SchedulesPage from './pages/Schedules'
import Header from './presets/Header'
import theme from './styles/theme'

import './styles/fixupWordBreak.css'
import './styles/fontOverrides.css'

const App = props => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />

        <Switch>
          <Route exact path='/schedules' component={SchedulesPage} />
          <Route exact path='/feeds/:page' component={FeedsPage} />
          <Redirect from='/feeds' to='/feeds/1' />
          {
            // NOTE: fallback to /feeds when user opens the old page schema;
          }
          <Redirect from='/page' to='/feeds' />
          <Redirect from='/page/:id' to='/feeds/:id' />
        </Switch>
      </Router>
    </ChakraProvider>
  )
}

export default App
