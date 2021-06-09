import React from 'react'
import ReactDom from 'react-dom'
import reportWebVitals from './reportWebVitals'
import Care from "./care";


ReactDom.render(
    <React.StrictMode>
        <Care />
    </React.StrictMode>,
    document.getElementById('app')
)
reportWebVitals()
