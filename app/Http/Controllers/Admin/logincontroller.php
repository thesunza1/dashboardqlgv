<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
    public function getlogin()
    {
        return view('backend.dangnhap');
    }

    public function postlogin(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        // Kiểm tra thông tin đăng nhập
        $user = DB::table('NHANVIEN')->where('NV_TAIKHOAN', $username)->first();
       
        if ($user && ($password==$user->nv_matkhau)) {
            // Đăng nhập thành công
            
            if($user->nv_quyen=='1')
                return redirect('/api/NV');
            if ($user->nv_quyen>'1') 
                return redirect('/api/LD');
        } else {
            // Đăng nhập thất bại
            return redirect('/api/?error=Sai+tên+đăng+nhập+hoặc+mật+khẩu+vui+lòng+nhập+lại');
        }
    }
}
