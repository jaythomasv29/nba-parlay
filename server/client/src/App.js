import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Main from "./pages/Main/Main";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Team from "./pages/Team/Team";
import Teams from "./pages/Teams/Teams";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Main />
      },
      {
        path: "/teams",
        element: <Teams />
      },
      {
        path: "/teams/:id",
        element: <Team />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  }
])
function App() {
  return (
    <RouterProvider router={router} />
    );
}

export default App;
