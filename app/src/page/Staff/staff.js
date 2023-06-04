import React from "react";
import { Link } from "react-router-dom"
import Header from "./Components/Header";
import Table from "./Components/Table";
import Pie_Chart_Sum from "./Components/Pie_Chart_Sum";
import Pie_Chart from "./Components/Pie_Chart";
import Bar_Chart_Time from "./Components/Bar_Chart_Time";
import Bar_Chart_Type from "./Components/Bar_Chart_Type";

function Home() {
    return(
        <div>
            <div>
                <Header/>
            </div>
            <div >
                <div>
                    <Table/>
                </div>
                <div className="flex justify-center">
                    <div>
                        <Pie_Chart_Sum/>
                    </div>
                    <div>
                        <Pie_Chart/>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div>
                        <Bar_Chart_Time/>
                    </div>
                    <div>
                        <Bar_Chart_Type/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;