import React from "react";

import {
    ComposedChart,
    Bar,
    LabelList,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

function Bar_Chart() {   
    //bar-chart
    var data_bar_chart = [
        {
            name: "Tháng 1",
            Số_Giờ: 1,
        },
        {
            name: "Tháng 2",
            Số_Giờ: 10,
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

    const barSize = data_bar_chart.length <= 10 ? 50 : data_bar_chart.length <= 30 ? 30 : 15;

    return (
        <div className="w-full">
            <br/>
            <div className="m-auto w-3/4 p-0 mb-5 border border-black rounded-xl">
                <h3 className="text-center">
                    Thời gian thực hiện của các công việc trong tháng 5 là : 200 giờ
                </h3>
                <div className="w-full h-[600px]">
                    <ComposedChart width={950} height={600} data={data_bar_chart}>
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" interval={0} angle={70} tickMargin={50} height={100} />
                        <YAxis />
                        {/* <Tooltip /> */}
                        <Bar dataKey="Số_Giờ" barSize={barSize} fill="#0088FE">
                            <LabelList dataKey="Số_Giờ" position="top" />
                        </Bar>
                    </ComposedChart>
                </div>
            </div>
           
        </div>
    );
}

export default Bar_Chart;
