import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import CallApi from "../../../API/CallAPI";

function Pie_Left() {
  const [data, setData] = useState([]);

  //pie-chart
  var COLORS = ["#3e92cc", "#fac858"];

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await CallApi("nvtron", "GET");
        console.log("Tròn trái", res.data);
        setData(() => {
          const data = res.data.map((number) => {
            if (number.name === "TongCvHT") {
              number.name = "Hoàn Thành";
            } else if (number.name === "TongCvHTQH") {
              number.name = "HT Quá Hạn";
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
    <div className="w-[47vw]">
      <br />
      <div className="w-[47vw] shadow-xl rounded-md bg-white">
        <p className="text-center text-xl font-bold py-3">
          Tỷ lệ công việc hoàn thành trong tháng{" "}
          {/* {data.find((thang) => thang.name === "thang")?.month} */}
        </p>
        <div className="flex justify-center items-center">
          {data.length !== 0 && (
            <PieChart width={650} height={360}>
              <Pie
                data={data.filter((month) => {
                  return (
                    month.name === "Hoàn Thành" || month.name === "HT Quá Hạn"
                  );
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

export default Pie_Left;
