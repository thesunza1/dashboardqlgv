import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import CallApi from "../../../API/CallAPI";

function Pie_Chart() {
  const [data, setData] = useState([]);

  //pie-chart
  var COLORS = ["#fac858", "#ee6766"];

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await CallApi("nvtron", "GET");
        console.log("Tròn phải", res.data);
        setData(() => {
          const data = res.data
            .filter((data) => {
              return (
                data.name === "TongCvChuaHT" || data.name === "TongCvChuaHTQH"
              );
            })
            .map((number) => {
              if (number.name === "TongCvChuaHT") {
                number.name = "Chưa HT";
              } else if (number.name === "TongCvChuaHTQH") {
                number.name = "Quá Hạn";
              }
              number.value = +number.value;
              return number;
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
    <div className="w-[45vw] ml-[3vw] pr-[4vw]">
      <br />
      <div className="w-[45vw] mb-10 shadow-2xl rounded-md bg-white">
        <p className="text-center text-xl font-bold py-3">
          Tổng công viêc chưa hoàn thành trong tháng{" "}
          {data.find((thang) => thang.name === "thang")?.value}
        </p>
        <div className="flex justify-center items-center">
          {data.length !== 0 && (
            <PieChart width={650} height={360}>
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

export default Pie_Chart;
