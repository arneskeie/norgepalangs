import React from 'react'
import ReactDOM from 'react-dom/client'
import '../../styles/main.css'
import ReisebrevPost from '../reisebrevpost/ReisebrevPost.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReisebrevPost n={4} />
  </React.StrictMode>
)
