import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "./routes/App";
import ErrorPage from "./error-page";

// import { AuthProvider } from './assets/contexts/AuthContext';
import SsoLogin from "./newui/ssoComponents/SsoLogin";
import SsoCallback from "./newui/ssoComponents/SsoCallback";
import { TokenProvider } from "./assets/contexts/TokenContext";

import UnderReviewRoute from "./services/UnderReviewRoute";

import Dashboard from "./routes/dashboard/Dashboard";
import NewPost from "./routes/NewPost/NewPost";
import AllPostsRoute from "./services/AllPostsRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/mostliked" />,
      },
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "/mostliked", // Relative path to '/dashboard'
            element: <AllPostsRoute />,
          },
          {
            path: "underreview", // Relative path to '/dashboard'
            element: <UnderReviewRoute featureStatus={"Under%20Review"} />,
          },
          {
            path: "implemented", // Relative path to '/dashboard'
            element: <UnderReviewRoute featureStatus={"Implemented"} />,
          },
          {
            path: "inprogress", // Relative path to '/dashboard'
            element: <UnderReviewRoute featureStatus={"In%20Progress"} />,
          },
        ],
      },
      {
        path: "newPost", // Absolute path
        element: <NewPost />,
      },
      {
        path: "ssologin", // Absolute path
        element: <SsoLogin />,
      },
      {
        path: "ssocallback", // Absolute path
        element: <SsoCallback />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TokenProvider>
      <RouterProvider router={router} />
    </TokenProvider>
  </React.StrictMode>
);
