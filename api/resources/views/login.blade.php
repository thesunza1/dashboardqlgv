
import React from "react";

import Logo from "../img/Logo_VNPT.png";
import BackGround from "../img//bg2.jpeg";

function Login() {
    return (
        <div className="">
            <div className="relative">
                <img className="w-full h-[100vh]" src={BackGround} alt="Background" />
                <div className="absolute border-2 border-blue-700 bg-blue-500 w-[25rem] h-[20rem] rounded-xl top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 opacity-90">
                    <div className="flex justify-center mt-4">
                        <h1 className="text-4xl font-bold text-white">Đăng nhập</h1>
                    </div>
                    <div className="justify-center mt-4 ml-8">
                        <h2 className="text-xl font-bold text-white">Tài khoản:</h2>
                        <input 
                            className="w-64 h-10 px-2 ml-4 mt-1 border border-black rounded-xl" 
                            type="text" 
                            id="username" name="username"
                            pattern="[A-Za-z]{15}"
                            placeholder="Tên tài khoản" 
                        />
                    </div>
                    <div className="justify-center mt-4 ml-8">
                        <h2 className="text-xl font-bold text-white">Mật khẩu:</h2>
                        <input 
                            className="w-64 h-10 px-2 ml-4 mt-1 border border-black rounded-xl" 
                            type="password" 
                            id="pwd" name="pwd"
                            pattern=".{8,}" 
                            title="Nhập ít nhất 8 ký tự"
                            placeholder="Mật khẩu" 
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button 
                            className="text-2xl font-bold text-blue-700 w-40 h-12 px-2 ml-4 mt-1 border border-black rounded-xl bg-white hover:bg-black hover:text-white hover:border-black hover:shadow-2xl hover:scale-1" 
                            type="submit">
                            Đăng nhập
                        </button>
                    </div>
                </div>
                <div className="absolute flex bg-blue-600 w-full h-[5rem] top-0">
                    <div className="flex justify-center w-20 h-20 ml-80">
                        <img className="bg-white" src={Logo} alt="Logo" />
                    </div>
                    <div className="flex justify-center text-center">
                        <h1 className="text-[3rem] font-bold text-white ml-32">TRANG QUẢN TRỊ</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;