import React, { useState } from "react";
import Logo from "../../img/Logo_VNPT.png";
import BackGround from "../../img//bg2.jpeg";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin() {
        // Check if username and password are empty
        if (username === "" || password === "") {
            setError(
                alert("Vui lòng nhập đúng tên tài khoản và mật khẩu")
            );
            return; // Stop login process
        }

        // Validate username
        const usernameRegex = /^[a-zA-Z0-9]{8,}$/;
        if (!usernameRegex.test(username)) {
            setError(
                alert("Tên tài khoản phải đủ 8 ký tự")
            );
            return;
        }

        const passwordRegex = /^.{8,}$/;
        if (!passwordRegex.test(password)) {
            setError(
                alert("Mật khẩu sai")
            );
            return;
        }

        // TODO: xử lý logic đăng nhập, ví dụ: gửi tên người dùng và mật khẩu đến máy chủ

        // Điều hướng đến trang chủ
        window.location.href = "/";
    }

    function handleKeyPress(event) {
        // Nếu nhấn 'enter' trong một trong hai trường nhập, mô phỏng nhấp chuột vào nút đăng nhập
        if (event.key === "Enter") {
            handleLogin();
        }
    }

    return (
        <div className="">
            <div className="relative">
                <img className="w-full h-[100vh]" src={BackGround} alt="Background" />
                <div className="absolute border border-blue-700 bg-blue-500 w-[25rem] h-[20rem] rounded-xl top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 opacity-90">
                    <div className="flex justify-center mt-4">
                        <h1 className="text-4xl font-bold text-white">Đăng nhập</h1>
                    </div>
                    <div className="justify-center mt-4 ml-8">
                        <h2 className="text-xl font-bold text-white">Tài khoản:</h2>
                        <input 
                            className="w-64 h-10 px-2 ml-4 mt-1 border border-black rounded-xl" 
                            type="text" 
                            id="username" name="username"
                            placeholder="Tên tài khoản"
                            value={username}
                            onKeyPress={handleKeyPress} 
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="justify-center mt-4 ml-8">
                        <h2 className="text-xl font-bold text-white">Mật khẩu:</h2>
                        <input 
                            className="w-64 h-10 px-2 ml-4 mt-1 border border-black rounded-xl" 
                            type="password" 
                            id="pwd" name="pwd"
                            placeholder="Mật khẩu"
                            value={password}
                            onKeyPress={handleKeyPress} 
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <p className="text-red-700 text-center mt-2">{error}</p>
                    <div className="flex justify-center mt-4">
                        <button 
                            id="loginButton"
                            className="text-2xl font-bold text-blue-700 w-40 h-12 px-2 ml-4 mt-1 border border-black rounded-xl bg-white hover:bg-black hover:text-white hover:border-black hover:shadow-2xl hover:scale-1" 
                            type="button"
                            onClick={handleLogin}>
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
