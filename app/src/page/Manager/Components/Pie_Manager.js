import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import CallApi from "../../../API/CallAPI";

function Pie_Manager() {
  const [data, setData] = useState([]);

  //pie-chart
  var COLORS = ["#178df0", "#90cb74", "#ee6766"];

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await CallApi("ldtron", "GET");
        console.log("Tròn", res.data);
        setData(() => {
          const data = res.data.map((number) => {
            if (number.name === "TongCvHT") {
              number.name = "CVHT";
            } else if (number.name === "TongCVCHT") {
              number.name = "Chưa HT";
            } else if (number.name === "TongCvDL") {
              number.name = "Quá Hạn";
            }
            number.value = parseInt(number.value);
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
    <div className="w-[48vw] ml-[2vw] z-0">
      <br />
      <div className="w-[45vw] shadow-2xl rounded-md bg-white">
        <p className="text-center text-xl font-bold py-3">
          Tỉ lệ công viêc trong tháng{" "}
          {data.find((thang) => thang.name === "thang")?.month}
        </p>
        <div className="flex justify-center items-center">
          {data.length !== 0 && (
            <PieChart width={750} height={400}>
              <Pie
                data={data.filter((cv) => {
                  return cv.name !== "thang";
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
                // labelLine={({ value }) => {
                //   if (value === 0) {
                //     return null;
                //   }
                //   return { stroke: "gray", strokeWidth: 1, radius: "40%" };
                // }}
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

export default Pie_Manager;
