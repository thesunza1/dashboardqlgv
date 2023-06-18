import React, { useState } from "react";
import Logo from "../../img/Logo_VNPT.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import { GrNext } from "react-icons/gr";

function Header() {
  const [selectedOption, setSelectedOption] = useState("Tháng 5");
  const [showOptions, setShowOptions] = useState(false);
  let navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  const ChooseLogout = () => {
    // xóa thông tin đăng nhập được lưu trữ
    localStorage.removeItem("userToken");

    // chuyển hướng đến trang đăng nhập
    navigate("/login");
  };

  return (
    <div className="flex bg-[#178df0]  w-full h-[5rem] top-0">
      <div className="flex w-20 h-20 ml-[10vw]">
        <img className="bg-white" src={Logo} alt="Logo" />
      </div>
      <h1 className="text-[3rem] font-bold text-white ml-[10vw]">
        TRANG QUẢN TRỊ
      </h1>
      <div className="ml-[20vw] flex items-center w-36">
        <div className="z-0 position">
          <div className="relative">
            <button
              className="bg-[#90cb74] text-[1.2rem] font-bold text-white rounded-full"
              onClick={() => setShowOptions(!showOptions)}
            >
              <div className="flex items-center">
                <span className="ml-4">{selectedOption}</span>
                {showOptions ? (
                  <AiOutlineDown className="ml-1 mr-2 text-xl text-white" />
                ) : (
                  <GrNext className="ml-1 mr-2 text-xl" />
                )}
              </div>
            </button>
            {showOptions && (
              <ul className="absolute border border-black bg-gray-200 py-2 rounded-md w-full">
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left ${
                      selectedOption === "Tháng 1" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 1")}
                  >
                    <span className="px-2">Tháng 1</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left ${
                      selectedOption === "Tháng 2" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 2")}
                  >
                    <span className="px-2">Tháng 2</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left ${
                      selectedOption === "Tháng 3" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 3")}
                  >
                    <span className="px-2">Tháng 3</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left ${
                      selectedOption === "Tháng 4" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 4")}
                  >
                    <span className="px-2">Tháng 4</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left ${
                      selectedOption === "Tháng 5" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 5")}
                  >
                    <span className="px-2">Tháng 5</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left ${
                      selectedOption === "Tháng 6" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 6")}
                  >
                    <span className="px-2">Tháng 6</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left ${
                      selectedOption === "Tháng 7" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 7")}
                  >
                    <span className="px-2">Tháng 7</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left ${
                      selectedOption === "Tháng 8" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 8")}
                  >
                    <span className="px-2">Tháng 8</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left ${
                      selectedOption === "Tháng 9" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 9")}
                  >
                    <span className="px-2">Tháng 9</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left ${
                      selectedOption === "Tháng 10" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 10")}
                  >
                    <span className="px-2">Tháng 10</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left ${
                      selectedOption === "Tháng 11" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 11")}
                  >
                    <span className="px-2">Tháng 11</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left ${
                      selectedOption === "Tháng 12" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 12")}
                  >
                    <span className="px-2">Tháng 12</span>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <button className="justify-center ml-[5vw]" onClick={ChooseLogout}>
        <span className="px-3 py-1 bg-[#ee6766] text-white rounded-full text-[1.2rem] font-bold">
          Đăng xuất
        </span>
      </button>
    </div>
  );
}

export default Header;
