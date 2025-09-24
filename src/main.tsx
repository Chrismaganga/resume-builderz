import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { SpeedInsights } from "@vercel/speed-insights/react"

const rootElement = document.getElementById('app')!
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
    <SpeedInsights/>
  </StrictMode>,
)
