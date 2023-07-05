import React from "react";
import { Link } from "react-router-dom";
import Header from "./Components/Header";
import Table from "./Components/Table";
import Bar_Time from "./Components/Bar_Time";
import Pie_Left from "./Components/Pie_Left";
import Pie_Right from "./Components/Pie_Right";
import Bar_Left from "./Components/Bar_Left";
import Bar_Right from "./Components/Bar_Right";

function Home() {
  return (
    <div className="bg-[#f9f8f8] text-gray-600">
      <div>
        <Header />
      </div>
      <div>
        <div>
          <Table />
        </div>
        <div className="flex justify-center">
          <Bar_Time />
        </div>
        <div className="flex justify-center px-[5]">
          <div>
            <Pie_Left />
          </div>
          <div>
            <Pie_Right />
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            <Bar_Left />
          </div>
          <div>
            <Bar_Right />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
