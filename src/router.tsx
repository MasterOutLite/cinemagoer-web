import {createBrowserRouter} from "react-router-dom";
import MainPage from "./app/MainPage";
import {Links} from "./helper/link";
import UserPage from "./app/user/UserPage";
import AdminPage from "./app/admin/AdminPage";
import MovieListPage from "./app/movie/MovieListPage";
import SerialPage from "./app/serial/SerialPage";
import CartonListPage from "./app/carton/CartonListPage";
import AnimePage from "./app/anime/AnimePage";
import DetailPage from "./app/DetailPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
  },
  {
    path: Links.user,
    element: <UserPage/>,
  }, {
    path: Links.admin,
    element: <AdminPage/>,
  }, {
    path: Links.movie,
    element: <MovieListPage/>,
  }, {
    path: Links.anime,
    element: <AnimePage/>,
  }, {
    path: Links.serial,
    element: <SerialPage/>,
  }, {
    path: Links.carton,
    element: <CartonListPage/>,
  }, {
    path: '/:videoCategory/:id',
    element: <DetailPage/>
  },
  {
    path: "*",
    element: <div>About</div>,
  },
]);
