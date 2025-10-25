import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Home from "../pages/Home";
import GoalsOverview from "../pages/GoalsOverview.tsx";
import GoalDetailed from "../pages/GoalDetailed.tsx";
import EducationalInsights from "../pages/EducationalInsights.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";

const MainRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Public routes */}
            <Route path={'/'} element={<Home />} />
            <Route path={'insights'} element={<EducationalInsights />} />

            {/* Protected routes */}
            <Route path={'goals'}>
                <Route index element={<GoalsOverview />} />
                <Route path={'goal/:id'} element={<GoalDetailed/>} />
            </Route>

            {/* Catch-all */}
            <Route path={'*'} element={<NotFoundPage />} />
        </>
    )
);

export default MainRouter;