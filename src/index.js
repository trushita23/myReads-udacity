import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

//added browser router to re render based on url
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
