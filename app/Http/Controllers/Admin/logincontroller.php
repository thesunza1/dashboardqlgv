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
    
    /*{
        $username = $request->nv_taikhoan;
        $pass=$request->nv_matkhau;
        $so=[$username,$pass];
        if (Auth::attempt($so)) {
            $user = Auth::user();
            return response()->json($user);
        }
        return redirect('/login')->withErrors(['message' => 'Tên đăng nhập hoặc mật khẩu không đúng']);
    }
    */
    {
        $credentials = $request->only('nv_taikhoan', 'nv_matkhau');
        $user = User::where('nv_taikhoan', $credentials['nv_taikhoan'])->first();
        if (Auth::attempt([!$user])) {
            return redirect('login')->withErrors([
                'login_failed' => 'Đăng nhập thất bại, vui lòng thử lại!'
            ]);
        }
        Auth::login($user);
        $user1=auth()->user();
        
        return response()->json($user1);
    }

}
    
    

