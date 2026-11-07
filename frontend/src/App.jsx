import React, {useEffect} from 'react';
import {Route, Routes} from "react-router";
import routes from "./routes/routes.jsx";
import useUserStore from "./store/auth.js";
import {CircularProgress} from "@mui/material";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

const App = () => {
    const {loadUser, isGetMeLoading} = useUserStore();

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    if (isGetMeLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100dvh',
                }}
            >
                <CircularProgress />
            </div>
        );
    }

    return (
        <>
            <Header/>
            <Routes>
                {routes.map(({path, element, children}, index) => (
                    <Route key={index} path={path} element={element}>
                        {children?.map(({path: childPath, element: childElement}, childIndex) => (
                            <Route key={childIndex} path={childPath} element={childElement} />
                        ))}
                    </Route>
                ))}
            </Routes>
            <Footer/>
        </>
    );
};

export default App;