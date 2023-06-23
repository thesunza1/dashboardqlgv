import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home/home";
import Login from "./page/Login/login";
import Manager from "./page/Manager/manager";
import Staff from "./page/Staff/staff";
import Header from "./page/Component/Header";
import NavBar from "./page/Component/NavBar";
import Filter from "./page/Component/FilterMonth";
//This "/" path is not used
// const InvalidPage = () => {
//   return <Redirect to="/login" />;
// };

function Dashboard() {
  return (
    <Routes>
      <Route path="/dashboardqlcv/" element={<Home />} />
      <Route path="/dashboardqlcv/login" element={<Login />} />
      <Route path="/dashboardqlcv/manager" element={<Manager />} />
      <Route path="/dashboardqlcv/staff" element={<Staff />} />
      <Route path="/dashboardqlcv/header" element={<Header />} />
      <Route path="/dashboardqlcv/navbar" element={<NavBar />} />
      <Route path="/dashboardqlcv/filter" element={<Filter />} />
    </Routes>
  );
}

export default Dashboard;
