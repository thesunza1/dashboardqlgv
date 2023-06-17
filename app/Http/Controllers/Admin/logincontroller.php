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
use JWTAuthException;


class LoginController extends Controller

{
    public function getlogin(){
        return view('backend.dangnhap');

    }

    public function postLogin(Request $request)
{
    $credentials = $request->only('nv_taikhoan', 'nv_matkhau');

    try {
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Tên đăng nhập hoặc mật khẩu không đúng'], 401);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Không thể tạo token'], 500);
    }

    $user = JWTAuth::user();
    $responseData = [
        'status' => 'success',
        'token' => $token,
        'user' => $user
    ];
    return response()->json($responseData);
}


}
    
    

