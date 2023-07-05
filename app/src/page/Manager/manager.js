import React from "react";
import Header from "./Components/Header";
import Table from "./Components/Table";
import Pie_Manager from "./Components/Pie_Manager";
import Bar_Manager from "./Components/Bar_Manager";

function Home() {
  return (
    <div className="bg-[#f9f8f8] text-gray-600">
      <Header />
      <div className="flex justify-center items-center mb-2">
        <div>
          <Bar_Manager />
        </div>
        <div>
          <Pie_Manager />
        </div>
      </div>
      <Table />
    </div>
  );
}

export default Home;
