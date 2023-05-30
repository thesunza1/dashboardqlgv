import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home/home";
import NavBar from "./page/Home/Components/NavBar";
import Login from "./page/Login/login";
import PieChart from "./page/Home/Components/Pie_Chart";
import BarChart from "./page/Home/Components/Bar_Chart";
import ListWork from "./page/Home/Components/Table"

//This "/" path is not used
// const InvalidPage = () => {
//   return <Redirect to="/login" />;
// };

function Dashboard () { 
    return (
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/navbar" element={<NavBar/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/pie-chart" element={<PieChart/>} />
          <Route path="/bar-chart" element={<BarChart/>} />
          <Route path="/list-work" element={<ListWork/>} />


      </Routes>
    );
}

export default Dashboard;
