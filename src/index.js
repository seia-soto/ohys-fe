import React from 'react'
import ReactDOM from 'react-dom'

import 'semantic-ui-css/semantic.min.css'
import './sfe__fontColors.css'
import './sfe__ohys.css'

import App from './App'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
