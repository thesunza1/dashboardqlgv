import React from "react";
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

function Bar_Left() {
  const { data } = React.useContext(ExampleContext);
  if (!data) {
    console.log("data", data);
    return null;
  }

  const barSize =
    data.NvCot.length <= 10 ? 50 : data.NvCot.length <= 30 ? 30 : 15;

  return (
    <div className="w-[47vw] mb-3">
      <br />
      <div className="shadow-xl rounded-md bg-white">
        <p className="text-center text-xl font-bold py-3">
          Thời gian thực hiện công việc trong tháng{" "}
          {data.NvCot.find((thang) => thang.name === "thang")?.month} là :{" "}
          {data.NvCot.find((thang) => thang.name === "TongGioLam")?.value} giờ
        </p>
        <div className="w-full h-[540px] mb-4 flex justify-center">
          <div className="rotate-90 items-center my-28 h-10 font-bold text-xl">
            Số giờ
          </div>
          {data.NvCot.length !== 0 && (
            <ComposedChart
              width={600}
              height={540}
              data={data.NvCot.filter((month) => {
                return month.name !== "TongGioLam" && month.name !== "thang";
              })}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis
                dataKey="cv_ten"
                interval={0}
                angle={60}
                tickMargin={100}
                height={200}
                padding={{ right: 30 }}
                dx={0} // Điều chỉnh vị trí của tick
                dy={-90} // Điều chỉnh vị trí của label
                textAnchor="start" // Căn lề của label theo hướng end (bên phải)
              />
              <YAxis padding={{ top: 25 }} />
              <Bar dataKey="so_gio_lam" barSize={barSize}>
                {data.NvCot.map((entry, index) => {
                  const fillColor = "#3e92cc"; // thay đổi màu fill tương ứng
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
          Tên công việc
        </div>
      </div>
    </div>
  );
}

export default Bar_Left;
