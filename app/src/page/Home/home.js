import React from "react";
import Header from "../Component/Header";
import Table from "./Components/Table/Table";
import Pie_Chart_Sum from "./Components/Pie_Chart_Sum";
import Pie_Chart from "./Components/Pie_Chart";
import Bar_Chart_Time from "./Components/Bar_Chart_Time";
import Bar_Chart_Type from "./Components/Bar_Chart_Type";

function Home() {
  return (
    <div className="bg-[#eff0f5]">
      <div>
        <Header />
      </div>
      <div>
        <div>
          <Table />
        </div>
        <div className="flex justify-center items-center">
          <div>
            <Pie_Chart_Sum />
          </div>
          <div>
            <Pie_Chart />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div>
            <Bar_Chart_Type />
          </div>
          <div>
            <Bar_Chart_Time />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
