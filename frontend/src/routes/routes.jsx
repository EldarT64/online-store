import {PATHS} from "./paths.js";
import MainPage from "../pages/MainPage/MainPage.jsx";
import Layout from "../components/Layout/Layout.jsx";
import Registration from "../pages/Registration/Registration.jsx";
import Login from "../pages/Login/Login.jsx";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.jsx";
import AboutUs from "../pages/AboutUs/AboutUs.jsx";

const routes = [
    {
        path: "/",
        element: <PrivateRoute>
            <Layout/>
        </PrivateRoute>,
        children: [
            {
                path: PATHS.MAIN_PAGE,
                element: <MainPage/>,
            },
        ],
    },
    {
        path: PATHS.REGISTER_PAGE,
        element: <Registration/>,
    },
    {
        path: PATHS.LOGIN_PAGE,
        element: <Login/>,
    },
    {
        path: PATHS.ABOUT_US_PAGE,
        element: <AboutUs/>,
    },
]

export default routes;
