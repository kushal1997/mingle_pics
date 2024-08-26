import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Error from "./pages/error";
import SignUp from "./pages/signUp";
import Home from "./pages/home";
import Post from "./pages/Post";
import Profile from "./pages/profile";
import MyPhotos from "./pages/myPhotos";

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/post",
    element: <Post />,
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <Error />,
  },
  {
    path: "/my_photos",
    element: <MyPhotos />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
]);

export default router;
