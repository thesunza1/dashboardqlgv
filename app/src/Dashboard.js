import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home/home";
import Manager from "./page/Manager/manager";
import Staff from "./page/Staff/staff";
import Header from "./page/Home/Components/Header"
import NavBar from "./page/Home/Components/NavBar";
import Login from "./page/Login/login";
import PieChart from "./page/Home/Components/Pie_Chart";
import PieChartSum from "./page/Home/Components/Pie_Chart_Sum";
import BarChartTime from "./page/Home/Components/Bar_Chart_Time";
import BarChartType from "./page/Home/Components/Bar_Chart_Type";
import ListWork from "./page/Home/Components/Table"
import Table from "./page/Home/Components/test_table"
//This "/" path is not used
// const InvalidPage = () => {
//   return <Redirect to="/login" />;
// };

function Dashboard () { 
    return (
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/manager" element={<Manager/>} />
          <Route path="/staff" element={<Staff/>} />
          <Route path="/header" element={<Header/>} />
          <Route path="/navbar" element={<NavBar/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/pie-chart-sum" element={<PieChartSum/>} />
          <Route path="/pie-chart" element={<PieChart/>} />
          <Route path="/bar-chart-time" element={<BarChartTime/>} />
          <Route path="/bar-chart-type" element={<BarChartType/>} />
          <Route path="/list-work" element={<ListWork/>} />
          <Route path="/table" element={<Table/>} />

      </Routes>
    );
}

export default Dashboard;
