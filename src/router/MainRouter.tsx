import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import Main from "../pages/Main.tsx";
import GoalTracking from "../pages/GoalTracking.tsx";

const MainRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path={'/'} element={<Main />} >
                <Route index element={<Home />} />

                <Route path={'/goals/:id'} element={<GoalTracking />} />
            </Route>

            {/* Catch-all */}
            <Route path={'*'} element={<NotFoundPage />} />
        </>
    )
);

export default MainRouter;