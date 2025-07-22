import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Router from './route/route.tsx'
import { MyProvider } from './contextApi/ContextApi.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyProvider>
      <RouterProvider router={Router}>
      </RouterProvider>
    </MyProvider>
  </StrictMode>,
)
