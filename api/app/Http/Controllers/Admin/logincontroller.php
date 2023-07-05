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
        $token = null;

        try {
            $user = NhanVien::where('nv_taikhoan', $credentials['nv_taikhoan'])->first();

            if (!$user) {
                return response()->json(['invalid_email_or_password'], 422);
            }

            if (!Hash::check($credentials['nv_matkhau'], $user->nv_matkhau)) {
                return response()->json(['invalid_email_or_password'], 422);
            }

            $token = JWTAuth::fromUser($user);
        } catch (JWTException $e) {
            return response()->json(['failed_to_create_token'], 500);
        }

        return response()->json(['message' => 'Login successful', 'token' => $token]);
    }
}
