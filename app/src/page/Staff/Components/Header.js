import React, { useState, useEffect } from "react";
import Logo from "../../../img/Logo_VNPT.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import { GrNext } from "react-icons/gr";
import { TbLogout } from "react-icons/tb";
import CallApi from "../../../API/CallAPI";
import ExampleContext from "../../Component/FilterMonth";

function Header() {
  const [selectedOption, setSelectedOption] = useState("Tháng ");
  const [user, setUser] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [month, setMonth] = useState([]);
  const { setData } = React.useContext(ExampleContext);

  // const [userName, setUserName] = useState("");
  // const [userRole, setUserRole] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    async function user() {
      try {
        let res = await CallApi("headernv", "GET");
        console.log("User", res.data);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    user();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await CallApi("nhanvien", "GET"); // truyền selectedOption vào API
        console.log("Tháng", res);
        // Xử lý dữ liệu trả về
        setMonth(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (month.length !== 0) {
      const thang = new Date().getMonth() + 1;
      handleOptionClick("Tháng " + thang);
    }
  }, [month]);

  const handleOptionClick = (option) => {
    console.log("Thang", option.split(` `)[1]);
    for (let i in month) {
      console.log("i", i.split(` `)[1]);
      if (option.split(` `)[1] === i.split(`_`)[1]) {
        console.log("mon", month[i]);
        setData(month[i][0]);
      }
    }
    setSelectedOption(option);
    setShowOptions(false);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const ChooseLogout = () => {
    // xóa thông tin đăng nhập được lưu trữ
    localStorage.removeItem("userToken");

    // chuyển hướng đến trang đăng nhập
    navigate("/dashboardqlcv/login");
  };

  return (
    <div className="flex justify-between bg-white  w-full h-[4rem] top-0 items-center border-b shadow-lg">
      <div className="flex w-14 h-14 ml-[2vw]">
        <img className="bg-white" src={Logo} alt="Logo" />
      </div>
      <h1 className="text-[2.5rem] font-bold text-gray-500 mr-[10vw]">
        TRANG QUẢN TRỊ
      </h1>
      <div className="flex ml-[30vw] w-36">
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
      {user.map((user) => (
        <div className="mx-[1vw]">
          <div className="font-bold text-xl">
            <p>{user.TenNv}</p>
          </div>
          <div className="text-lg">
            <p>{user.ChucVu}</p>
          </div>
        </div>
      ))}
      {/* <div
        className="flex mr-[2vw] px-2 py-1 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={ChooseLogout}
          className="flex mr-[2vw] px-2 py-1 bg-[#ee6766] text-white rounded-lg text-[1.2rem] hover:bg-red-600"
        >
          <TbLogout />
        </button>

        {showPopup && (
          <div className="absolute py-1 px-2 w-24 bg-[#ee6766] text-white font-bold rounded-lg mt-7 ml-1">
            Đăng xuất
          </div>
        )}
      </div> */}
    </div>
  );
}

export default Header;
