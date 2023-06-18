import React, { useState, useEffect } from "react";
import CallApi from "../../../API/CallAPI";

import { PieChart, Pie, Cell } from "recharts";

function Pie_Chart() {
  const [chart, setChart] = useState([]);

  // const data_pie_chart = chart.map(
  //   (x) => x.name,
  //   (y) => y.value
  // );

  const data_pie_chart = [
    { name: "Hoàn thành", value: 30 },
    { name: "HT quá hạn", value: 15 },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await CallApi("nvtron", "GET");
        console.log(res.data);
        setChart(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const COLORS = ["#91cc75", "#ee6766"];

  const sum = data_pie_chart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );
  const data_pie_chart_percentage = data_pie_chart.map((item) => ({
    ...item,
    percentage: ((item.value / sum) * 100).toFixed(2),
  }));

  return (
    <div className="w-[45vw] ml-[3vw]">
      <br />
      <div className="w-[45vw] shadow-2xl rounded-md bg-white">
        <p className="text-center text-xl font-bold mt-2 pt-3">
          Tỷ lệ công việc chưa hoàn thành trong tháng 5
        </p>
        <div className="flex justify-center items-center">
          <PieChart width={650} height={360}>
            <Pie
              data={data_pie_chart_percentage}
              cx="50%"
              cy="50%"
              label={({ name, value, percentage }) =>
                `${name}: ${value} (${percentage}%)`
              }
              labelLine={{ stroke: "gray", strokeWidth: 1, radius: "40%" }}
              outerRadius="130"
              fill="#8884d8"
              dataKey="value"
            >
              {data_pie_chart_percentage.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            {/* <Legend /> */}
          </PieChart>{" "}
        </div>
      </div>
    </div>
  );
}

export default Pie_Chart;
