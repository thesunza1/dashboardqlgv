import React, { useState, useEffect } from "react";
import CallApi from "../../../API/CallAPI";

import {
  ComposedChart,
  Bar,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

function Bar_Time() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await CallApi("cotngay", "GET"); // gọi API để lấy dữ liệu
        console.log("Cột trái", res.data);
        setData(
          res.data.map((number) => {
            number.so_gio_lam = +number.so_gio_lam;
            return number;
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
    <div className="w-[full] px-8">
      <br />
      <div className="shadow-xl rounded-md bg-white">
        <div className="flex justify-between px-5 py-3">
          <p className="text-center text-xl font-bold">
            Biểu đồ giờ làm trong ngày
          </p>
          <p className="text-center text-xl font-bold pr-32">
            Tháng {data.find((thang) => thang.name === "thang")?.month}
          </p>
          <p className="text-center text-xl font-bold">
            Tổng giờ : {data.find((thang) => thang.name === "tong_gio")?.value}
          </p>
        </div>
        <div className="w-full h-[400px] flex justify-center pr-20">
          <div className="rotate-90 items-center mb-28 h-20 mt-28 font-bold text-xl">
            Số giờ
          </div>
          {data.length !== 0 && (
            <ComposedChart
              width={1000}
              height={400}
              data={data.filter((month) => {
                return month.name !== "tong_gio" && month.name !== "thang";
              })}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis
                dataKey="ngay-lam"
                interval={0}
                angle={60}
                tickMargin={50}
                height={105}
              />
              <YAxis padding={{ top: 20 }} />
              <Bar dataKey="so_gio_lam" barSize={barSize}>
                {data.map((entry, index) => {
                  const fillColor = "#3e92cc"; // thay đổi màu fill tương ứng
                  return <Cell key={`cell-${index}`} fill={fillColor} />;
                })}
                <LabelList dataKey="so_gio_lam" position="top" fill="blue" />
              </Bar>
              <Tooltip
                formatter={(value, name) => [value + " giờ làm", name]}
              />
            </ComposedChart>
          )}
        </div>
        <div className="flex justify-center font-bold pb-2 text-xl">Ngày</div>
      </div>
    </div>
  );
}

export default Bar_Time;
