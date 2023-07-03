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

function Bar_Chart_Time() {   
    //bar-chart
    var data_bar_chart_time = [
        {
            name: "Tháng 1",
            Số_Giờ: 20,
        },
        {
            name: "Tháng 2",
            Số_Giờ: 55,
        },
        {
            name: "Tháng 3",
            Số_Giờ: 5,
        },
        {
            name: "Tháng 4",
            Số_Giờ: 6,
        },
        {
            name: "Tháng 5",
            Số_Giờ: 7,
        },
        {
            name: "Tháng 6",
            Số_Giờ: 4,
        },
        {
            name: "Tháng 7",
            Số_Giờ: 9,
        },
        {
            name: "Tháng 8",
            Số_Giờ: 2,
        },
        {
            name: "Tháng 9",
            Số_Giờ: 6,
        },
        {
            name: "Tháng 10",
            Số_Giờ: 19,
        },
        {
            name: "Tháng 11",
            Số_Giờ: 19,
        },{
            name: "Tháng 12",
            Số_Giờ: 21,
        },
    ];

    const barSize = data_bar_chart_time.length <= 10 ? 50 : data_bar_chart_time.length <= 30 ? 30 : 15;
    // const dataMax = Math.max(...data_bar_chart_time.map(entry => entry.value)); // tìm giá trị lớn nhất trong mảng dữ liệu
    // const domainMax = dataMax + 15; // tăng giá trị lớn nhất thêm 5
    
    return (
        <div className="w-[55vw]">
            <br/>
            <div className="m-auto w-3/4 p-0 mb-5 border border-black rounded-xl">
                <h3 className="text-center">
                    Thời gian thực hiện của các công việc trong tháng 5 là : 200 giờ
                </h3>
                <div className="w-full h-[550px]">
                    <ComposedChart width={500} height={550} data={data_bar_chart_time}>
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" interval={0} angle={70} tickMargin={50} height={100} />
                        <YAxis />
                        <Bar dataKey="Số_Giờ" barSize={barSize}>
                            {data_bar_chart_time.map((entry, index) => {
                                const fillColor = index % 2 === 0 ? "#0088FE" : "#e5e5e5"; // thay đổi màu fill tương ứng
                                return (
                                <Cell key={`cell-${index}`} fill={fillColor} />
                                );
                            })}
                            <LabelList dataKey="Số_Giờ" position="top" fill="blue"/>
                        </Bar>
                    </ComposedChart>
                </div>
            </div>
           
        </div>
    );
}

export default Bar_Chart_Time;
