import React from "react";

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
  //bar-chart
  var data_bar_chart = [
    {
      name: "Lập trình",
      Số_Giờ: 41,
    },
    {
      name: "Triển khai",
      Số_Giờ: 40,
    },
    {
      name: "Hỗ trợ",
      Số_Giờ: 35,
    },
    {
      name: "Viết báo cáo",
      Số_Giờ: 26,
    },
    {
      name: "Lập kế hoạch",
      Số_Giờ: 17,
    },
  ];

  const barSize =
    data_bar_chart.length <= 10 ? 50 : data_bar_chart.length <= 30 ? 30 : 15;

  return (
    <div className="w-[45vw]">
      <br />
      <div className="w-[45vw] p-0 shadow-2xl rounded-md bg-white">
        <h3 className="text-center text-xl font-bold py-3">
          Tỉ lệ thời gian thực hiện công việc của các đơn vị trong tháng 5
        </h3>
        <div className="w-full h-[450px] mb-10 flex justify-center items-center">
          <ComposedChart width={600} height={450} data={data_bar_chart}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              dataKey="name"
              interval={0}
              angle={70}
              tickMargin={50}
              height={110}
            />
            <YAxis />
            <Bar dataKey="Số_Giờ" barSize={barSize}>
              {data_bar_chart.map((entry, index) => {
                const fillColor = index % 2 === 0 ? "#3e92cc" : "#91cc75"; // thay đổi màu fill tương ứng
                return <Cell key={`cell-${index}`} fill={fillColor} />;
              })}
              <LabelList dataKey="Số_Giờ" position="top" fill="blue" />
            </Bar>
          </ComposedChart>
        </div>
      </div>
    </div>
  );
}

export default Bar_Chart_Type;
