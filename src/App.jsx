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
import SearchPage from './pages/Search'
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
          <Route exact path='/search' component={SearchPage} />
          <Route exact path='/search/:keyword' component={SearchPage} />
          <Redirect from='/feeds' to='/feeds/1' />
          {
            // NOTE: fallback to /feeds when user opens the old page schema;
          }
          <Redirect from='/page' to='/feeds' />
          <Redirect from='/page/:id' to='/feeds/:id' />
          <Redirect from='/series/:name' to='/search/:name' />
        </Switch>
      </Router>
    </ChakraProvider>
  )
}

export default App
