<?php

namespace App\Http\Controllers\Admin;


use Illuminate\Support\Facades\Http;
use App\Models\NhanVien;

use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\RedirectResponse;
use  Illuminate\Validation\Validator;
use App\Models\User;
use JWTAuth;
use Exception;


class LoginController extends Controller

{
    public function getlogin()
    {
        return view('backend.dangnhap');
    }

    public function postLogin(Request $request)
    {
        $credentials = $request->only('nv_taikhoan', 'nv_matkhau');
        // Lấy mật khẩu đã được mã hóa từ cơ sở dữ liệu
        $storedHashedPassword = getHashedPasswordFromDatabase($credentials['nv_taikhoan']);

        if ($storedHashedPassword && Hash::check($credentials['nv_matkhau'], $storedHashedPassword)) {
            // Đăng nhập thành công
            return redirect('/dashboard');
        } else {
            // Đăng nhập không thành công
            return back()->withErrors(['message' => 'Tài khoản hoặc mật khẩu không đúng']);
        }
    }
}
