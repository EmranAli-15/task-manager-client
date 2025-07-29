import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import Home from "../pages/Home";
import InsideNote from "../pages/InsideNote";
import AddNote from "../pages/AddNote";
import Protected, { Locked } from "../protectedRoutes/Protected";
import Register from "../pages/Register";
import Notes from "../pages/Notes";

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
        path: "/notes/:id",
        element: <Protected><Notes></Notes></Protected>,
    },
    {
        path: "/inside-note",
        element: <Protected><InsideNote></InsideNote></Protected>,
    }
]);


export default Router;