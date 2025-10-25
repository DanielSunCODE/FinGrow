import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Home from "../pages/Home";
import GoalsOverview from "../pages/GoalsOverview.tsx";
import GoalDetailed from "../pages/GoalDetailed.tsx";
import Recommendations from "../pages/Recommendations.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import Main from "../pages/Main.tsx";

const MainRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path={'/'} element={<Main />} >
                <Route index element={<Home />} />
                <Route path={'recommendations'} element={<Recommendations />} />

                <Route path={'goals'}>
                    <Route index element={<GoalsOverview />} />
                    <Route path={'goal/:id'} element={<GoalDetailed/>} />
                </Route>
            </Route>

            {/* Catch-all */}
            <Route path={'*'} element={<NotFoundPage />} />
        </>
    )
);

export default MainRouter;