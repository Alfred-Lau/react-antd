import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import MainRouters from './routers'

ReactDOM.render(<MainRouters />, document.getElementById('root'))
registerServiceWorker()
