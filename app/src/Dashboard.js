import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./page/Login/login";
import Manager from "./page/Manager/manager";
import Staff from "./page/Staff/staff";
import Header from "./page/Component/Header";
import NavBar from "./page/Component/NavBar";
import Filter from "./page/Component/FilterMonth";
import ExampleContext from "../../app/src/page/Component/FilterMonth";

//This "/" path is not used
// const InvalidPage = () => {
//   return <Redirect to="/login" />;
// };

function Dashboard() {
  const [data, setData] = useState(null);

  return (
    <ExampleContext.Provider value={{ data, setData }}>
      <Routes>
        <Route path="/dashboardqlcv/login" element={<Login />} />
        <Route path="/dashboardqlcv/manager" element={<Manager />} />
        <Route path="/dashboardqlcv/staff" element={<Staff />} />
        <Route path="/dashboardqlcv/header" element={<Header />} />
        <Route path="/dashboardqlcv/navbar" element={<NavBar />} />
        <Route path="/dashboardqlcv/filter" element={<Filter />} />
      </Routes>
    </ExampleContext.Provider>
  );
}

export default Dashboard;
