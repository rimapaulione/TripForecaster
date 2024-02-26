import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import WeatherLayout from "./ui/WeatherLayout";
import CityList from "./pages/CityList";
import City, { loader as loaderForecast } from "./pages/City";
import Forecast from "./pages/Forecast";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    errorElement: <PageNotFound />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Home /> },
          //{ path: "login", element: <Login /> }, @Todo complete login and auth
          //{ path: "forecast", element: <Forecast /> },
        ],
      },
      {
        path: "weather",
        element: <WeatherLayout />,
        children: [
          { index: true, element: <Navigate to="cities" replace /> },
          { path: "cities", element: <CityList /> },
          {
            path: "cities/:id",
            element: <City />,
            loader: loaderForecast,
            errorElement: <Error />,
          },
          { path: "forecast", element: <Forecast /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
