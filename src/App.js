import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Header from './components/Header'
import SearchBar from './components/SearchBar'

import List from './pages/List'
import Search from './pages/Search'
import Series from './pages/Series'

import store from './structures/store'
import translations from './translations'

const App = props => {
  const { language } = store.get()
  const translation = translations[language]

  return (
    <BrowserRouter>
      <Header />

      <div className='sfe__ohys_body'>
        <div className='ui basic container segment'>
          <div className='ui stackable two column grid'>
            <div className='column'>
              <div className='ui list'>
                <a className='item' href='https://discordapp.com/invite/vAEBXWY'>
                  <i className='magic icon'/>
                  <div className='content'>
                    <div className='header'>{translation.app.links.support.title}</div>
                    <div className='description'>{translation.app.links.support.description}</div>
                  </div>
                </a>
                <a className='item' href='https://cryental.dev/services/anime/'>
                  <i className='file icon'/>
                  <div className='content'>
                    <div className='header'>{translation.app.links.mirror.title}</div>
                    <div className='description'>{translation.app.links.mirror.description}</div>
                  </div>
                </a>
              </div>
            </div>
            <div className='column'>
              <SearchBar />
            </div>
          </div>
        </div>
        <div className='ui basic container segment'>
          <Switch>
            <Route path='/page/:page'>
              <List />
            </Route>
            <Route path='/search/:keyword'>
              <Search />
            </Route>
            <Route path='/series/:series'>
              <Series />
            </Route>
            <Route path='/'>
              <Redirect to='/page/1' />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
