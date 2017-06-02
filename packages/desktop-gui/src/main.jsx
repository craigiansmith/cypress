import { useStrict, toJS } from 'mobx'
import queryString from 'query-string'
import React from 'react'
import { render } from 'react-dom'

import ipc from './lib/ipc'
import handleGlobalErrors from './lib/handle-global-errors'
import momentOverrides from './lib/configure-moment'

import App from './app/app'
import Updates from './update/updates'

useStrict(true)

handleGlobalErrors()
momentOverrides()

if (window.env === 'test' || window.env === 'development') {
  window.toJS = toJS
}

window.App = {
  ipc, // for stubbing in tests

  start () {
    const projectPath = queryString.parse(location.search).projectPath
    render(<App projectPath={projectPath} />, document.getElementById('app'))
  },

  startUpdateApp () {
    render(<Updates />, document.getElementById('updates'))
  },
}
