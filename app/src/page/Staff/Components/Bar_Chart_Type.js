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

function Bar_Chart_Type() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await CallApi("nhanvien", "GET"); // gọi API để lấy dữ liệu
        console.log("Cột phải", res.data);
        setData(
          res.data.map((enk) => {
            enk.value = +enk.value;
            return enk;
          })
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  const barSize = data.length <= 10 ? 50 : data.length <= 30 ? 30 : 15;

  return (
    <div className="w-[45vw] ml-[3vw]">
      <br />
      <div className="w-[45vw] shadow-2xl rounded-md bg-white">
        <p className="text-center text-xl font-bold py-3">
          Thời gian thực hiện của các công việc trong tháng{" "}
          {data.find((thang) => thang.name === "thang")?.value} là :{" "}
          {data.find((thang) => thang.name === "TongGioLam")?.value} giờ
        </p>
        <div className="w-full h-[450px] mb-10 flex justify-center items-center">
          {data.length !== 0 && (
            <ComposedChart
              width={600}
              height={450}
              data={data.filter((month) => {
                return month.name !== "TongGioLam" && month.name !== "thang";
              })}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis
                dataKey="lcv_ten"
                interval={0}
                angle={70}
                tickMargin={50}
                height={110}
              />
              <YAxis padding={{ top: 20 }} />
              <Bar dataKey="so_gio_lam" barSize={barSize}>
                {data.map((entry, index) => {
                  const fillColor = index % 2 === 0 ? "#3e92cc" : "#91cc75"; // thay đổi màu fill tương ứng
                  return <Cell key={`cell-${index}`} fill={fillColor} />;
                })}
                <LabelList dataKey="so_gio_lam" position="top" fill="blue" />
              </Bar>
            </ComposedChart>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bar_Chart_Type;
