<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;


class LdCot extends Controller
{
    public function cot(Request $request){
        $thang=$request->input('thang');
        if(!$thang){
            $thang=date('m');
            $Bang=CongViec::BangDv()->get();
            return response()->json($Bang);
        }

    }
}
