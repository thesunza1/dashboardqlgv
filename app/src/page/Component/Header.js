import React, { useState, useEffect } from "react";
import Logo from "../../img/Logo_VNPT.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import { GrNext } from "react-icons/gr";
import { TbLogout } from "react-icons/tb";
import CallApi from "../../API/CallAPI";

function Header() {
  const [selectedOption, setSelectedOption] = useState("Tháng 6");
  const [showOptions, setShowOptions] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  let navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchUserProfile() {
  //     try {
  //       let res = await CallApi("ldcot", "GET");
  //       console.log("user", res.data);
  //       setUserName(res.data.name);
  //       setUserRole(res.data.role);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchUserProfile();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await CallApi("head", selectedOption, "GET"); // truyền selectedOption vào API
        console.log("Tháng", res);
        // Xử lý dữ liệu trả về
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [selectedOption]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  const ChooseLogout = () => {
    // xóa thông tin đăng nhập được lưu trữ
    localStorage.removeItem("userToken");

    // chuyển hướng đến trang đăng nhập
    navigate("/dashboardqlcv/login");
  };

  return (
    <div className="flex bg-white  w-full h-[4rem] top-0 items-center border-b shadow-xl">
      <div className="flex  w-14 h-14 ml-[10vw]">
        <img className="bg-white" src={Logo} alt="Logo" />
      </div>
      <h1 className="text-[2.5rem] font-bold text-gray-500 ml-[5vw]">
        TRANG QUẢN TRỊ
      </h1>
      <div className="ml-[33vw] flex w-36">
        <div className="z-10 position">
          <div className="relative">
            <button
              className="bg-[#90cb74] text-[1.2rem] font-bold text-white rounded-lg hover:bg-green-500"
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
              <ul className="absolute border border-black bg-gray-200 py-2 rounded-lg w-full">
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left hover:bg-blue-400 ${
                      selectedOption === "Tháng 1" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 1")}
                  >
                    <span className="px-2">Tháng 1</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left hover:bg-blue-400  ${
                      selectedOption === "Tháng 2" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 2")}
                  >
                    <span className="px-2">Tháng 2</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left hover:bg-blue-400  ${
                      selectedOption === "Tháng 3" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 3")}
                  >
                    <span className="px-2">Tháng 3</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left hover:bg-blue-400  ${
                      selectedOption === "Tháng 4" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 4")}
                  >
                    <span className="px-2">Tháng 4</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left hover:bg-blue-400  ${
                      selectedOption === "Tháng 5" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 5")}
                  >
                    <span className="px-2">Tháng 5</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left hover:bg-blue-400  ${
                      selectedOption === "Tháng 6" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 6")}
                  >
                    <span className="px-2">Tháng 6</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left hover:bg-blue-400  ${
                      selectedOption === "Tháng 7" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 7")}
                  >
                    <span className="px-2">Tháng 7</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left hover:bg-blue-400  ${
                      selectedOption === "Tháng 8" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 8")}
                  >
                    <span className="px-2">Tháng 8</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left hover:bg-blue-400  ${
                      selectedOption === "Tháng 9" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 9")}
                  >
                    <span className="px-2">Tháng 9</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left hover:bg-blue-400  ${
                      selectedOption === "Tháng 10" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 10")}
                  >
                    <span className="px-2">Tháng 10</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left hover:bg-blue-400  ${
                      selectedOption === "Tháng 11" && "bg-blue-400 text-white"
                    }`}
                    onClick={() => handleOptionClick("Tháng 11")}
                  >
                    <span className="px-2">Tháng 11</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex mx-2 h-6 w-[80%] rounded-md text-md font-bold text-left hover:bg-blue-400  ${
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
      <div className="mx-[1vw]">
        <div className="font-bold text-xl">
          <p>{userName}</p>
        </div>
        <div className="text-lg">
          <p>{userRole}</p>
        </div>
      </div>
      <button
        className="flex ml-[1vw] px-2 py-1 bg-[#ee6766] text-white rounded-lg text-[1.2rem] hover:bg-red-600 "
        onClick={ChooseLogout}
      >
        <TbLogout />
      </button>
    </div>
  );
}

export default Header;
