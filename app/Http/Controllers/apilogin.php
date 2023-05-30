<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class apilogin extends Controller
{
    public function apilogin(Request $request)
    
        $username = $request->input('username');
        $password = $request->input('password');

        // Kiểm tra tính đúng đắn của thông tin đăng nhập
        $user = DB::table('nhanvien')->where([
            ['username', '=', $username],
            ['password', '=', $password],
        ])->first();

       
    }


