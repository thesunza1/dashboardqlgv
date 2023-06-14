<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;
use Illuminate\Support\Carbon;


class LdTron extends Controller
{
    public function tron(Request $request){
       
        $thang=$request->input('thang');
        
        if($thang){
            
            $TongCvTHT=CongViec::CongViecHoanThanhDv($thang);
            $TongCvTCHT=CongViec::CongViecChuaHoanThanhDv($thang);
            $TongCvTDL=CongViec::CongViecDangLamDv($thang);
            $tron=[
                "TongCvHT"=>$TongCvTHT,
                "TongCvCHT"=>$TongCvTCHT,
                "TongCvDL"=>$TongCvTDL,

            ];
            return response()->json([$tron]);
        }
        if(!$thang){
            $thang = Carbon::now();
            $TongCvTHT=CongViec::CongViecHoanThanhDv($thang);
            $TongCvTCHT=CongViec::CongViecChuaHoanThanhDv($thang);
            $TongCvTDL=CongViec::CongViecDangLamDv($thang);
            $tron=[
                "TongCvHT"=>$TongCvTHT,
                "TongCvCHT"=>$TongCvTCHT,
                "TongCvDL"=>$TongCvTDL,

            ];
            return response()->json([$tron]);
        
        }
    }
}
