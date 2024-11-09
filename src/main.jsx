import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Root from ""
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>

<RouterProvider router={router} />
 

 </StrictMode>

  
 
);
