<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;


class LdTron extends Controller
{
    public function tron(Request $request){
        $id=1;
        if($id){
            $thang = date('m');
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
