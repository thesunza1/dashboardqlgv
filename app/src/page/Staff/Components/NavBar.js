import React, { useState } from 'react';
import Logo from "../../../img/Logo_VNPT.png";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
// import { RxCaretRight, RxCaretDown } from "react-icons/rx";

function NavBar () {
    const [showOptions, setShowOptions] = useState(false);
    const [showChart, setShowChart] = useState(false);

    function toggleOptions() {  
        setShowOptions(!showOptions);
    }

    function handleOptionClick(option) {
        console.log(`Selected option: ${option}`);
        setShowOptions(false);
    }

    // function toggleChart() {
    //     setShowChart(!showChart);
    // }

    // function handleChartClick(option) {
    //     console.log(`Selected option: ${option}`);
    //     setShowChart(false);
    // }

    return (
        <div className="w-60 border-r border-black h-[100vh]">
            <div className="flex justify-center">
                <img className="bg-white mt-3 w-16 h-16" src={Logo} alt="Logo" />
            </div>
            <div>
                <button 
                    className="flex bg-blue-500 ml-2 w-90% text-[2rem] font-bold text-white mt-3 rounded-full" 
                    onClick={toggleOptions}>
                    <span className="ml-4">Dashboard</span>
                    {showOptions ? (
                        <AiOutlineMinusSquare className="ml-2 mr-3 mt-4 text-xl text-black" />
                    ) : (
                        <AiOutlinePlusSquare className="ml-2 mr-3 mt-4 text-xl text-black" />
                    )}
                </button>
                {showOptions && (
                    <ul>
                        <li className="w-full mt-2">
                            <a 
                                className='flex ml-5 mr-1 h-8 rounded-md text-xl bg-blue-300 font-bold text-black hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionClick('Lựa chọn 1')}>
                                <span className='ml-2'>Danh sách công việc</span>
                                
                            </a>
                        </li>
                        <li className="w-full mt-2">
                            <a 
                                className='flex ml-5 mr-1 h-8 rounded-md text-xl bg-blue-300 font-bold text-black hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionClick('Lựa chọn 2')}>
                                <span className='ml-2'>Thời gian thực hiện</span>
                            </a>
                        </li>
                        <li className="w-full mt-2">
                            <a 
                                className='flex ml-5 mr-1 h-8 rounded-md text-xl bg-blue-300 font-bold text-black hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionClick('Lựa chọn 3')}>
                                <span className='ml-2'>Tỉ lệ thực hiện </span>   
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}
export default NavBar;
