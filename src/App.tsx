import MainRouter from "./router/MainRouter.tsx";
import {RouterProvider} from "react-router-dom";

function App() {
  return (
      <RouterProvider router={MainRouter} />
  )
}

export default App
