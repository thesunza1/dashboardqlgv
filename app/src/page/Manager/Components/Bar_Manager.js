import React, { useState, useEffect } from "react";
import CallApi from "../../../API/CallAPI";
import ExampleContext from "../../Component/FilterMonth";

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
  const { data: songuyen } = React.useContext(ExampleContext);

  let data = songuyen;

  if (!data) {
    console.log("data", data);
    return null;
  }

  data = songuyen.LdCot.map((number) => {
    number.value = parseInt(number.value);
    return number;
  });

  const barSize = data.length <= 10 ? 50 : data.length <= 30 ? 30 : 15;

  return (
    <div className="w-[48vw] ml-[3vw] z-1">
      <br />
      <div className="shadow-2xl rounded-md bg-white">
        <p className="text-center text-xl font-bold py-3">
          Thời gian làm việc của các phòng ban trong tháng{" "}
          {data.find((thang) => thang.name === "thang")?.month}
        </p>
        <div className="w-full h-[400px] flex justify-center items-center pr-8">
          <div className="rotate-90 items-center mb-28 h-10 mt-1 font-bold text-xl">
            Số giờ
          </div>
          {data.length !== 0 && (
            <ComposedChart
              width={600}
              height={400}
              data={data.filter((month) => {
                return month.name !== "thang";
              })}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis
                dataKey="name"
                interval={0}
                angle={60}
                tickMargin={50}
                height={130}
                padding={{ right: 30 }}
                dx={-15} // Điều chỉnh vị trí của tick
                dy={-30} // Điều chỉnh vị trí của label
                textAnchor="start" // Căn lề của label theo hướng end (bên phải)
              />
              <YAxis padding={{ top: 20 }} />
              <Bar dataKey="value" barSize={barSize}>
                {data.map((entry, index) => {
                  const fillColor = "#3e92cc"; // thay đổi màu fill tương ứng
                  return <Cell key={`cell-${index}`} fill={fillColor} />;
                })}
                <LabelList
                  dataKey="value"
                  position="top"
                  style={{
                    fontSize: "20px",
                  }}
                />
              </Bar>
            </ComposedChart>
          )}
        </div>
        <div className="flex justify-center font-bold pb-2 text-xl">
          Tên phòng ban
        </div>
      </div>
    </div>
  );
}

export default Bar_Manager;
