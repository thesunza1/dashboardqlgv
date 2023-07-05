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

function Bar_Right() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       let res = await CallApi("cotloai", "GET"); // gọi API để lấy dữ liệu
  //       console.log("Cột phải", res.data);
  //       setData(
  //         res.data.map((number) => {
  //           number.so_gio_lam = +number.so_gio_lam;
  //           return number;
  //         })
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  const { data } = React.useContext(ExampleContext);
  if (!data) {
    console.log("data", data);
    return null;
  }

  const barSize =
    data.NvCotTrai.length <= 10 ? 50 : data.NvCotTrai.length <= 30 ? 30 : 15;

  return (
    <div className="w-[47vw] ml-[1vw] mb-3">
      <br />
      <div className="shadow-xl rounded-md bg-white">
        <p className="text-center text-xl font-bold py-3">
          Thời gian thực hiện các loại công việc trong tháng{" "}
          {data.NvCotTrai.find((thang) => thang.name === "thang")?.month}
        </p>
        <div className="w-full h-[540px] mb-4 flex justify-center">
          <div className="rotate-90 items-center my-28 h-10 font-bold text-xl">
            Số giờ
          </div>
          {data.NvCotTrai.length !== 0 && (
            <ComposedChart
              width={600}
              height={540}
              data={data.NvCotTrai.filter((month) => {
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
                dx={0} // Điều chỉnh vị trí của tick
                dy={-30} // Điều chỉnh vị trí của label
                textAnchor="start" // Căn lề của label theo hướng end (bên phải)
              />
              <YAxis padding={{ top: 25 }} />
              <Bar dataKey="so_gio_lam" barSize={barSize}>
                {data.NvCotTrai.map((entry, index) => {
                  const fillColor = "#91cc75"; // thay đổi màu fill tương ứng
                  return <Cell key={`cell-${index}`} fill={fillColor} />;
                })}
                <LabelList
                  dataKey="so_gio_lam"
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
          Loại công việc
        </div>
      </div>
    </div>
  );
}

export default Bar_Right;
