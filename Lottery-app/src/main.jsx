import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'; // Ensure Tailwind directives are in this file
import 'flowbite'; // Import Flowbite for JS functionality
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
