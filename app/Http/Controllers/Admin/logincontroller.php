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


class LoginController extends Controller

{
    public function getlogin(){
        return view('backend.dangnhap');

    }

    public function postlogin(Request $request )
    
    {
        $credentials = $request->only('nv_taikhoan', 'nv_matkhau');
    $user = NhanVien::where('nv_taikhoan', $credentials['nv_taikhoan'])->first();
    
    if ($user && Hash::check($credentials['nv_matkhau'], $user->nv_matkhau)) {
        // Đăng nhập thành công
        Auth::login($user);
        $token = $user->createToken('MyApp')->accessToken;
        $responseData = [
            'status' => 'success',
            'token' => $token,
            'user' => $user
        ];
        return response()->json($responseData);
    } else {
        // Đăng nhập thất bại
        $responseData = [
            'status' => 'error',
            'message' => 'Tên đăng nhập hoặc mật khẩu không đúng'
        ];
        return response()->json($responseData, 401);
    }
        
        
        
        
        
    }

}
    
    

