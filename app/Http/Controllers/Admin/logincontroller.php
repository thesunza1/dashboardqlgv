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
class LoginController extends Controller
{
    public function getlogin()
    {
        return view('backend.dangnhap');
    }

    public function postlogin(Request $request)
    {
        $use=$request->input('username');
        $arr =[
            'nv_taikhoan'=>$request->nv_taikhoan,
            'nv_matkhau'=>$request->password

        ];
        return $arr;
        if (Auth::attempt($arr)) {
           // $request->session()->regenerate();
           
        // Đăng nhập thành công
        $nhanvien = NhanVien::where('nv_taikhoan',$use)->first();
        if ($nhanvien->nv_quyen == 'nv') {
            // Người dùng có quyền lãnh đạo, chuyển hướng đến trang danh sách nhân viên
            return redirect('/api/nhanvien');
        } if ($nhanvien->nv_quyen == 'ld') {
            // Người dùng có quyền lãnh đạo, chuyển hướng đến trang danh sách nhân viên
            return redirect('/api/lanhdao');}
        
        
    } else {
        // Đăng nhập thất bại
        return '111';back()->withErrors(['message' => 'Tên đăng nhập hoặc mật khẩu không chính xác, vui lòng thử lại!']);
    }
           
    
    
    
}
}