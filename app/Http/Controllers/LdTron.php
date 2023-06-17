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
            $month = $thang->format('m');
            $th=ltrim($month,'0');
            $TongCvTHT=CongViec::CongViecHoanThanhDv($thang);
            $TongCvTCHT=CongViec::CongViecChuaHoanThanhDv($thang);
            $TongCvTDL=CongViec::CongViecDangLamDv($thang);
            $TCVHT=["name"=>"TongCvHT","value"=>"$TongCvTHT"];
            $TCVCHT=["name"=>"TongCVCHT","value"=>"$TongCvTCHT"];
            $TCVDL=["name"=>"TongCvDL","value"=>"$TongCvTDL"];
            $tha=["name"=>"thang","value"=>"$th"];
            $tron=[
                "TongCvHT"=>$TongCvTHT,
                "TongCvCHT"=>$TongCvTCHT,
                "TongCvDL"=>$TongCvTDL,

            ];
            return response()->json([$TCVHT,$TCVCHT,$TCVDL,$tha]);
        
        }
        if(!$thang){
            $thang = Carbon::now();
            $month = $thang->format('m');
            $th=ltrim($month,'0');
           
            $TongCvTHT=CongViec::CongViecHoanThanhDv($thang);
            $TongCvTCHT=CongViec::CongViecChuaHoanThanhDv($thang);
            $TongCvTDL=CongViec::CongViecDangLamDv($thang);

            $TCVHT=["name"=>"TongCvHT","value"=>"$TongCvTHT"];
            $TCVCHT=["name"=>"TongCVCHT","value"=>"$TongCvTCHT"];
            $TCVDL=["name"=>"TongCvDL","value"=>"$TongCvTDL"];
            $tha=["name"=>"thang","value"=>"$th"];
            $tron=[
                "TongCvHT"=>$TongCvTHT,
                "TongCvCHT"=>$TongCvTCHT,
                "TongCvDL"=>$TongCvTDL,

            ];
            return response()->json([$TCVHT,$TCVCHT,$TCVDL,$tha]);
        
        }
    }
}
