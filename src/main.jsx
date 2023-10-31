import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './routes/App'
import './index.css'
import ErrorPage from './error-page';
import Roadmap from './routes/Roadmap';
import FeatureRequest from './routes/featureRequest';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "roadmap",
        element: <Roadmap />,
      },
      {
        path: "featurerequest",
        element: <FeatureRequest />,
      }
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
