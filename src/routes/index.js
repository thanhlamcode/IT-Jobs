import LayoutAdmin from "../Layout/LayoutAdmin";
import LayoutDefault from "../Layout/LayoutDefault";
import Private from "../components/Private";
import Apply from "../pages/Apply";
import CVManager from "../pages/CVManager";
import Introduce from "../pages/Introduce";
import JobManager from "../pages/JobManager";
import Login from "../pages/Login";
import Overview from "../pages/Overview";
import RegisInfo from "../pages/RegisInfo";
import Register from "../pages/Register";
import Search from "../pages/Search";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Introduce />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "apply/:id",
        element: <Apply />,
      },
    ],
  },
  {
    path: "admin",
    element: <Private />,
    children: [
      {
        path: "",
        element: <LayoutAdmin />,
        children: [
          {
            path: "overview",
            element: <Overview />,
          },
          {
            path: "regisinfo",
            element: <RegisInfo />,
          },
          {
            path: "jobmanager",
            element: <JobManager />,
          },
          {
            path: "cvmanager",
            element: <CVManager />,
          },
        ],
      },
    ],
  },
];
