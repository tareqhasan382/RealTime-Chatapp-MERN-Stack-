import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../components/NotFound";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import Chat from "../components/Chat";
import PrivateRoute from "../components/PrivateRoute"
const routes = createBrowserRouter([
  
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <App />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/chat",
        element: <PrivateRoute><Chat /></PrivateRoute>,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default routes;
