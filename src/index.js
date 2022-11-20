import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    ilmoitus: notificationReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(<Provider store={store}><App /></Provider>)