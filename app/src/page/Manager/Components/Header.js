import React, { useState } from "react";
import Logo from "../../../img/Logo_VNPT.png";
import { AiOutlineDown } from "react-icons/ai";
import { GrNext } from "react-icons/gr"

function Header() { 
    const [showOptionsMonth, setShowOptionsMonth] = useState(false);

    function toggleOptionsMonth() {  
        setShowOptionsMonth(!showOptionsMonth);
    }

    function handleOptionMonthClick(option) {
        console.log(`Selected option: ${option}`);
        setShowOptionsMonth(false);
    }

    return (
        <div className="flex justify-between bg-blue-600 w-full h-[5rem] top-0">
            <div className="flex justify-center w-20 h-20 ml-40">
                <img className="bg-white" src={Logo} alt="Logo" />
            </div>
            <div className="flex justify-center">
                <h1 className="text-[3rem] font-bold text-white ml-20">TRANG QUẢN TRỊ</h1>
            </div>
            <div className="justify-center mt-6 ml-60 z-0 position">
                {/* <button 
                    className="bg-[#6a994e] text-[1.2rem] font-bold text-white rounded-full" 
                    onClick={toggleOptionsMonth}
                >
                    <div className="flex items-center">
                        <span className="ml-4">Tháng 5</span>
                        {showOptionsMonth ? (
                            <AiOutlineDown className="ml-1 mr-2 text-xl text-white" />
                        ) : (
                            <GrNext className="ml-1 mr-2 text-xl" />
                        )}
                    </div>
                </button>
                {showOptionsMonth && (
                    <option  className="border border-black bg-white py-2">
                        <option className="w-full">
                            <a 
                                className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionMonthClick('Lựa chọn 1')}>
                                <span className='px-2'>Tháng 1</span>
                                
                            </a>
                        </option>
                        <option className="w-full mt-2">
                            <a 
                                className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionMonthClick('Lựa chọn 2')}>
                                <span className='px-2'>Tháng 2</span>
                            </a>
                        </option>
                        <option className="w-full mt-2">
                            <a 
                                className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionMonthClick('Lựa chọn 3')}>
                                <span className='px-2'>Tháng 3</span>   
                            </a>
                        </option>
                        <option className="w-full mt-2">
                            <a 
                                className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionMonthClick('Lựa chọn 3')}>
                                <span className='px-2'>Tháng 4</span>   
                            </a>
                        </option>
                        <option className="w-full mt-2">
                            <a 
                                className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionMonthClick('Lựa chọn 3')}>
                                <span className='px-2'>Tháng 5</span>   
                            </a>
                        </option>
                        <option className="w-full mt-2">
                            <a 
                                className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionMonthClick('Lựa chọn 3')}>
                                <span className='px-2'>Tháng 6</span>   
                            </a>
                        </option>
                        <option className="w-full mt-2">
                            <a 
                                className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionMonthClick('Lựa chọn 3')}>
                                <span className='px-2'>Tháng 7</span>   
                            </a>
                        </option>
                        <option className="w-full mt-2">
                            <a 
                                className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionMonthClick('Lựa chọn 3')}>
                                <span className='px-2'>Tháng 8</span>   
                            </a>
                        </option>
                        <option className="w-full mt-2">
                            <a 
                                className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionMonthClick('Lựa chọn 3')}>
                                <span className='px-2'>Tháng 9</span>   
                            </a>
                        </option>
                        <option className="w-full mt-2">
                            <a 
                                className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionMonthClick('Lựa chọn 3')}>
                                <span className='px-2'>Tháng 10</span>   
                            </a>
                        </option>
                        <option className="w-full mt-2">
                            <a 
                                className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionMonthClick('Lựa chọn 3')}>
                                <span className='px-2'>Tháng 11</span>   
                            </a>
                        </option>
                        <option className="w-full mt-2">
                            <a 
                                className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                href="#" 
                                onClick={() => handleOptionMonthClick('Lựa chọn 3')}>
                                <span className='px-2'>Tháng 12</span>   
                            </a>
                        </option>
                    </option>
                )} */}
               <select name="pets" id="pet-select">
                    <option value="Tháng 1">Tháng 1</option>
                    <option value="Tháng 1">Tháng 2</option>
                    <option value="Tháng 1">Tháng 3</option>
                    <option value="Tháng 1">Tháng 4</option>
                    <option value="Tháng 1">Tháng 5</option>
                    <option value="Tháng 1">Tháng 6</option>
                    <option value="Tháng 1">Tháng 7</option>
                    <option value="Tháng 1">Tháng 8</option>
                    <option value="Tháng 1">Tháng 9</option>
                    
                </select>
            </div>
            <div className="justify_center mr-8 mt-6">
                <button className="flex bg-[#ff0202] text-[1.2rem] font-bold text-white rounded-full">
                    <span className="px-3">Đăng xuất</span>
                </button>
            </div>
        </div>
    );
}

export default Header;