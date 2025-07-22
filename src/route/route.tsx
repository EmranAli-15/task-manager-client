import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Inside from "../pages/Inside";
import About from "../pages/About";
import Protected, { Locked } from "../protectedRoutes/Protected";
import Register from "../pages/Register";

const Router = createBrowserRouter([
    {
        path: "/login",
        element: <Locked><Login></Login></Locked>
    },
    {
        path: "/register",
        element: <Locked><Register></Register></Locked>
    },
    {
        path: "/",
        element: <Protected><Home></Home></Protected>,
        children: [
            {
                path: "about",
                element: <About />,
            },
            {
                path: "inside",
                element: <Inside />,
            },
        ],
    },
]);


export default Router;