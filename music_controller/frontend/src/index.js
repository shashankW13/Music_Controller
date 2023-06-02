import App from "./components/App"
import ReactDOMClient from "react-dom/client"
import React from "react"
import { StrictMode } from "react"

const container = document.getElementById("app")
const root = ReactDOMClient.createRoot(container)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
