import React from "react";

import {
    Legend,
    PieChart, 
    Pie,
    Cell,
} from "recharts";

function Pie_Chart() {   
    //pie-chart
    var data_pie_chart = [
        { name: "Công việc quá hạn", value: 10 },
        { name: "Công việc chưa hoàn thành", value: 15 },
        { name: "Công việc đã hoàn thành", value: 2 },
    ];

    var COLORS = ["#f21b3f", "#3e92cc", "#8ac926"];
    const renderCustom = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        index
        }) => {
        const RADIAN = Math.PI / 180;
        const radius = 25 + outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        // Truy cập giá trị của từng phần tử
        const value = data_pie_chart[index].value;
        
        return (
            <text
            x={x}
            y={y}
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            >
            {value}
            </text>
        );
    };

    return (
        <div className="w-full">
            <br/>
            <div className="m-auto w-3/4 mb-5 border border-black rounded-xl">
                <h3 className="text-center">
                    Tổng số công viêc và trạng thái công viêc trong tháng 5 là : 27 công việc
                </h3>
                <div className="w-3/4 m-auto">
                    <PieChart width={800} height={450}>
                        <Pie
                            data={data_pie_chart}
                            isAnimationActive={true} // Animation
                            cx="50%"
                            cy="50%"
                            label={renderCustom}
                            outerRadius={160}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data_pie_chart.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>{" "}
                </div>
            </div>
        </div>
    );
}

export default Pie_Chart;
