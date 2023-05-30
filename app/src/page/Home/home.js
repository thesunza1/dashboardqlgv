import React from "react";
import { Link } from "react-router-dom"

function Home() {
    return(
        <ul>
            <li>    
                <Link to="/login">Login</Link>
            </li>
            <li>    
                <Link to="/navbar">NavBar</Link>
            </li>
            <li>    
                <Link to="/pie-chart">Pie_Chart</Link>
            </li>
            <li>    
                <Link to="/list-work">ListWork</Link>
            </li>
            <li>
                <Link to="/bar-chart">Bar_Chart</Link>
            </li>
        </ul>
    );
}

export default Home;