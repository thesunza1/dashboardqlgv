import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import CallApi from "../../../API/CallAPI";

function Pie_Right() {
  const [data, setData] = useState([]);

  //pie-chart
  var COLORS = ["#fac858", "#ee6766"];

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await CallApi("nvtron", "GET");
        console.log("Tròn phải", res.data);
        setData(() => {
          const data = res.data.map((number) => {
            if (number.name === "TongCvChuaHT") {
              number.name = "Chưa HT";
            } else if (number.name === "TongCvChuaHTQH") {
              number.name = "Quá Hạn";
            }
            number.value = +number.value;
            return number;
          });

          return data;
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-[47vw] ml-[1vw]">
      <br />
      <div className="w-[47vw] shadow-xl rounded-md bg-white">
        <p className="text-center text-xl font-bold py-3">
          Tỉ lệ công viêc chưa hoàn thành trong tháng{" "}
          {data.find((thang) => thang.name === "thang")?.month}
        </p>
        <div className="flex justify-center items-center">
          {data.length !== 0 && (
            <PieChart width={650} height={360}>
              <Pie
                data={data.filter((data) => {
                  return data.name === "Chưa HT" || data.name === "Quá Hạn";
                })}
                dataKey="value"
                cx="50%"
                cy="50%"
                label={({ name, value, tile }) => {
                  if (value === 0) {
                    return null;
                  }
                  return `${name}: ${tile} (${value})`;
                }}
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
            </PieChart>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pie_Right;
