import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ValidateSelectedProfile, VerifyUserAuthentication } from "./middlewares";
import { DashboardLayout, DefaultLayout } from "../layouts/default";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Home } from "../pages/home";

export function BrowserRouter() {
  const router = createBrowserRouter([
    {
      element: (
        <VerifyUserAuthentication>
          <DefaultLayout />,
        </VerifyUserAuthentication>
      ),
      children: [
        { 
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      element: (
        <ValidateSelectedProfile>
          <DashboardLayout />,
        </ValidateSelectedProfile>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
