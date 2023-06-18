import React, { useState, useEffect } from "react";
import CallApi from "../../../API/CallAPI";

import {
  ComposedChart,
  Bar,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

function Bar_Manager() {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await CallApi("ldcot", "GET"); // gọi API để lấy dữ liệu
        console.log("Cột", res.data);
        setChart(
          res.data.map((number) => {
            number.value = parseInt(number.value);
            return number;
          })
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  const barSize = chart.length <= 10 ? 50 : chart.length <= 30 ? 30 : 15;
  // const dataMax = Math.max(...chart.map(entry => entry.value)); // tìm giá trị lớn nhất trong mảng dữ liệu
  // const domainMax = dataMax + 15; // tăng giá trị lớn nhất thêm 5

  return (
    <div className="w-[45vw] ml-[4vw]">
      <br />
      <div className="shadow-2xl rounded-md bg-white">
        <p className="text-center text-xl font-bold py-3">
          Thời gian làm việc của các phòng ban trong tháng{" "}
          {chart.find((thang) => thang.name === "thang")?.value}
        </p>
        <div className="w-full h-[400px] mb-10 flex justify-center items-center">
          {chart.length !== 0 && (
            <ComposedChart
              width={600}
              height={400}
              data={chart.filter((month) => {
                return month.name !== "thang";
              })}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis
                dataKey="name"
                interval={0}
                angle={70}
                tickMargin={50}
                height={110}
              />
              <YAxis padding={{ top: 20 }} />
              <Bar dataKey="value" barSize={barSize}>
                {chart.map((entry, index) => {
                  const fillColor = index % 2 === 0 ? "#3e92cc" : "#91cc75"; // thay đổi màu fill tương ứng
                  return <Cell key={`cell-${index}`} fill={fillColor} />;
                })}
                <LabelList dataKey="value" position="top" fill="blue" />
              </Bar>
            </ComposedChart>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bar_Manager;
