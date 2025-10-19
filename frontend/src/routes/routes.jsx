import {PATHS} from "./paths.js";
import MainPage from "../pages/MainPage/MainPage.jsx";
import Layout from "../components/Layout/Layout.jsx";
import Registration from "../pages/Registration/Registration.jsx";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.jsx";

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
    }
]

export default routes;
