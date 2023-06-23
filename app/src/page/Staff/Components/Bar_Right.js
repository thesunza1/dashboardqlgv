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

function Bar_Right() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await CallApi("cotloai", "GET"); // gọi API để lấy dữ liệu
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
    <div className="w-[47vw] ml-[1vw]">
      <br />
      <div className="shadow-xl rounded-md bg-white">
        <p className="text-center text-xl font-bold py-3">
          Thời gian thực hiện các loại công việc trong tháng{" "}
          {data.find((thang) => thang.name === "thang")?.month}
        </p>
        <div className="w-full h-[540px] mb-10 flex justify-center">
          {data.length !== 0 && (
            <ComposedChart
              width={600}
              height={540}
              data={data.filter((month) => {
                return month.name !== "TongGioLam" && month.name !== "thang";
              })}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis
                dataKey="lcv_ten"
                interval={0}
                angle={50}
                tickMargin={50}
                height={200}
                padding={{ right: 30 }}
                dx={-20} // Điều chỉnh vị trí của tick
                dy={-30} // Điều chỉnh vị trí của label
                textAnchor="start" // Căn lề của label theo hướng end (bên phải)
              />
              <YAxis padding={{ top: 20 }} />
              <Bar dataKey="so_gio_lam" barSize={barSize}>
                {data.map((entry, index) => {
                  const fillColor = "#91cc75"; // thay đổi màu fill tương ứng
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
      </div>
    </div>
  );
}

export default Bar_Right;
