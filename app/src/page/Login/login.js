import React, { useState } from "react";
import Logo from "../../img/Logo_VNPT.png";
import BackGround from "../../img//bg.jpeg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    // Check if username and password are empty
    if (username === "" || password === "") {
      setError(alert("Vui lòng nhập đúng tên tài khoản và mật khẩu"));
      return; // Stop login process
    }

    // Validate username
    const usernameRegex = /^[a-zA-Z0-9]{5,}$/;
    if (!usernameRegex.test(username)) {
      setError(alert("Tên tài khoản phải đủ 5 ký tự"));
      return;
    }

    const passwordRegex = /^.{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(alert("Mật khẩu sai"));
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
    <div>
      <div className="relative flex items-center">
        <div className="mt-[15vh]">
          <img
            className="w-[40vw] h-[60vh] ml-[15vw]"
            src={BackGround}
            alt="Background"
          />
        </div>
        <div className="absolute shadow-xl bg-blue-400 w-[25rem] h-[20rem] mt-[6vh] rounded-lg top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 opacity-90">
          <div className="flex justify-center mt-4">
            <h1 className="text-4xl font-bold text-white">Đăng nhập</h1>
          </div>
          <div className="justify-center mt-4 ml-8">
            <h2 className="text-xl font-bold text-white">Tài khoản:</h2>
            <input
              className="w-64 h-10 px-2 ml-4 mt-1 border border-black rounded-lg"
              type="text"
              id="username"
              name="username"
              placeholder="Tên tài khoản"
              value={username}
              onKeyPress={handleKeyPress}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="justify-center mt-4 ml-8">
            <h2 className="text-xl font-bold text-white">Mật khẩu:</h2>
            <input
              className="w-64 h-10 px-2 ml-4 mt-1 border border-black rounded-lg"
              type="password"
              id="pwd"
              name="pwd"
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
              className="text-2xl font-bold text-blue-700 w-40 h-12 px-2 ml-4 mt-1 border rounded-lg bg-white hover:bg-blue-700 hover:text-white hover:shadow-2xl hover:scale-1"
              type="button"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          </div>
        </div>
        <div className="absolute flex bg-white  w-full h-[4rem] top-0 items-center border-b shadow-xl justify-center">
          <div className="flex  w-14 h-14">
            <img className="bg-white" src={Logo} alt="Logo" />
          </div>
          <h1 className="text-[2.5rem] font-bold text-gray-500 ml-[5vw]">
            TRANG QUẢN TRỊ
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
