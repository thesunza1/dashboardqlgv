import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home/home";
import Login from "./page/Login/login";
import Manager from "./page/Manager/manager";
import Staff from "./page/Staff/staff";
import Header from "./page/Component/Header";
import NavBar from "./page/Component/NavBar";
import PieChart from "./page/Home/Components/Pie_Chart";
import PieChartSum from "./page/Home/Components/Pie_Chart_Sum";
import BarChartTime from "./page/Home/Components/Bar_Chart_Time";
import BarChartType from "./page/Home/Components/Bar_Chart_Type";
import Table from "./page/Home/Components/Table/Table";
import Data from "./page/Home/Components/Table/Data_test";
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
      <Route path="/dashboardqlcv/pie-chart-sum" element={<PieChartSum />} />
      <Route path="/dashboardqlcv/pie-chart" element={<PieChart />} />
      <Route path="/dashboardqlcv/bar-chart-time" element={<BarChartTime />} />
      <Route path="/dashboardqlcv/bar-chart-type" element={<BarChartType />} />
      <Route path="/dashboardqlcv/table" element={<Table />} />
      <Route path="/dashboardqlcv/tests" element={<Data />} />
    </Routes>
  );
}

export default Dashboard;
