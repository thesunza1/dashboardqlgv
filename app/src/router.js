import React from "react";
import Home from "./Home/home";
import NavBar from "./page/Home/Components/NavBar";
import Login from "./page/Login/login";
import PieChart from "./page/Home/Components/Pie_Chart";
import ListWork from "./page/ListWork/listwork"


const routes = [
  {
    path: "/home",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/navbar",
    exact: true,
    main: () => <NavBar />,
  },
  {
    path: "/login",
    exact: true,
    main: () => <Login />,
  },
  {
    path: "/pie-chat",
    exact: true,
    main: () => <PieChart />,
  },
  {
    path: "/list-work",
    exact: true,
    main: () => <ListWork />,
  },
];

export default routes;
