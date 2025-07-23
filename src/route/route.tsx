import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Inside from "../pages/Inside";
import AddNote from "../pages/AddNote";
import Protected, { Locked } from "../protectedRoutes/Protected";
import Register from "../pages/Register";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home></Home></Protected>,
    },
    {
        path: "/login",
        element: <Locked><Login></Login></Locked>
    },
    {
        path: "/register",
        element: <Locked><Register></Register></Locked>
    },
    {
        path: "/add-note",
        element: <Protected><AddNote></AddNote></Protected>,
    },
    {
        path: "/inside",
        element: <Protected><Inside></Inside></Protected>,
    }
]);


export default Router;