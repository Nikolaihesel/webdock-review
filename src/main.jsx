import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from './routes/App'
import './index.css'
import ErrorPage from './error-page';
import Roadmap from './routes/Roadmap';
import FeatureRequest from './routes/featureRequest';
import MyRequest from './routes/MyRequest';
import { AuthProvider } from './assets/contexts/AuthContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/roadmap" replace /> /* redirect så default side er roadmap tab */
      },

      {
        path: "roadmap",
        element: <Roadmap />,
      },
      {
        path: "featurerequest",
        element: <FeatureRequest />,
      },
      {
        path: "myrequest",
        element: <MyRequest />,
      }
    ],


    
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} /> {/* child, alt inde i den kan tilgå authprovider, sørger for tabs på siden */}
    </AuthProvider> {/* state wrapped i context */}
  </React.StrictMode>,
)
