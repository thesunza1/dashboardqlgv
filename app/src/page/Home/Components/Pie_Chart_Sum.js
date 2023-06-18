import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import CallApi from "../../../API/CallAPI";

function Pie_Chart_Sum() {
  const [data, setData] = useState([]);
  // const data = [
  //   { name: "TongCvHoanThanhQH", value: 2 },
  //   { name: "TongCvChuaHT", value: 3 },
  //   { name: "TongCvChuaHTQH", value: 6 },
  // ];

  //pie-chart
  var COLORS = ["#178df0", "#90cb74", "#ee6766"];

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await CallApi("nvtron", "GET");
        console.log(res.data);
        setData(() => {
          const data = res.data
            .filter((an) => {
              return (
                an.name === "TongCvChuaHT" ||
                an.name === "TongCvHT" ||
                an.name === "TongCvHTQH"
              );
            })
            .map((enk) => {
              enk.value = +enk.value;
              return enk;
            });
          const sum = data.reduce(
            (accumulator, currentValue) => accumulator + currentValue.value,
            0
          );
          const dataPercentage = data.map((item) => ({
            ...item,
            percentage: ((item.value / sum) * 100).toFixed(2),
          }));
          return dataPercentage;
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-[50vw] ml-[2vw] pr-[4vw]">
      <br />
      <div className="w-[45vw] mb-5 shadow-2xl rounded-md bg-white">
        <h3 className="text-center text-xl font-bold">
          Tổng số công viêc trong tháng 5
        </h3>
        <div className="flex justify-center items-center">
          {data.length !== 0 && (
            <PieChart width={650} height={450}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                label={({ name, value, percentage }) =>
                  `${name}: ${value} (${percentage}%)`
                }
                labelLine={{ stroke: "gray", strokeWidth: 1, radius: "40%" }}
                outerRadius="130"
                fill="#8884d8"
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              {/* <Legend /> */}
            </PieChart>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pie_Chart_Sum;
