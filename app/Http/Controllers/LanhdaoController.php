<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\NhanVien;
use Illuminate\Support\Carbon;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LanhdaoController extends Controller
{
 
    //
    
    public function lanhdao(Request $request)
    {
        $thang=$request->input('thang');
        if($thang){
           
            $BieuDoCot=NhanVien::SoGioLamTheoDv($thang);
            return response()->json($BieuDoCot);
        }
        if(!$thang){
            $thang=Carbon::now();
            $BieuDoCot=NhanVien::SoGioLamTheoDv($thang);
            return response()->json($BieuDoCot);

}   
    }
}