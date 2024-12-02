import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Root from './components/root'
import './index.css'
import { Provider } from 'jotai'
import LandingPage from './landingPage'


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },{
    path: "/game",
    element: <Root />
  },
]);

createRoot(document.getElementById('root')).render(
  <>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </>
);


