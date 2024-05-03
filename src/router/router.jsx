import {  createBrowserRouter } from "react-router-dom";
import Root from "../Root.jsx";

const router = createBrowserRouter([
    {path: "*", Component: Root}
]);

export default router;