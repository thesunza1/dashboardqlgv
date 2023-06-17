<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;
use Illuminate\Support\Carbon;

class NvTron extends Controller
{ public function tron(Request $request){
    $id=1;
    $thang=request()->input('thang');
    if ($id&&$thang) {
        $month = $thang->format('m');
        $th=ltrim($month,'0');
        

//Tổng công việc cha trong tháng
        $TongCv = CongViec::countCvChaThang($id,$thang);    

//tổng công việc hoàn thành
        $TongCvHoanThanh= CongViec::CongViecHoanThanh($id,$thang);

//tổng công việc hoàn thành qúa hạn
        $TongCvHoanThanhQuaHan=CongViec::CongViecHoanThanhQuaHan($id,$thang);
        
//tổng công việc chưa hoàn thành 
        $TongCvChuaHoanThanh=CongViec::CongViecChuaHoanThanh($id,$thang);
        
//tổng công việc chưa hoàn thành quá hạn
        $TongCvChuaHoanThanhQH=CongViec::CongViecChuaHoanThanhQH($id,$thang);




       
       
        $TCV=["name"=>"TongCv","value"=>"$TongCv"];
       $TCVCHT=["name"=>"TongCvChuaHT","value"=>"$TongCvChuaHoanThanh"];
       $TCVCHT=["name"=>"TongCvChuaHT","value"=>"$TongCvChuaHoanThanh"];
       $TCVCHTQH=["name"=>"TongCvChuaHTQH","value"=>"$TongCvChuaHoanThanhQH"];
       $TCVHT=["name"=>"TongCvHT","value"=>"$TongCvHoanThanh"];
       $TCVHTQH=["name"=>"TongCvHTQH","value"=>"$TongCvHoanThanhQuaHan"];
       $tha=["name"=>"thang","value"=>"$th"];
        $nvtron = [
            "TongCv" => $TongCv,
            "TongCvChuaHT" => $TongCvChuaHoanThanh,
            "TongCvChuaHTQH" => $TongCvChuaHoanThanhQH,
            "TongCvHoanThanh" => $TongCvHoanThanh,
            "TongCvHoanThanhQH" => $TongCvHoanThanhQuaHan,
            "thang"=>$th
        ];
        
        
        return response()->json([$TCV,$TCVCHT,$TCVCHTQH,$TCVHT,$TCVHTQH,$tha]);
        
        
    }
    
    
    if ($id) {
        $thang = Carbon::now();
        $month = $thang->format('m');
        $th=ltrim($month,'0');
       
//Tổng công việc cha trong tháng
        $TongCv = CongViec::countCvChaThang($id,$thang);    

//tổng công việc hoàn thành
        $TongCvHoanThanh= CongViec::CongViecHoanThanh($id,$thang);

//tổng công việc hoàn thành qúa hạn
        $TongCvHoanThanhQuaHan=CongViec::CongViecHoanThanhQuaHan($id,$thang);
        
//tổng công việc chưa hoàn thành 
        $TongCvChuaHoanThanh=CongViec::CongViecChuaHoanThanh($id,$thang);
        
//tổng công việc chưa hoàn thành quá hạn
        $TongCvChuaHoanThanhQH=CongViec::CongViecChuaHoanThanhQH($id,$thang);




       
       $TCV=["name"=>"TongCv","value"=>"$TongCv"];
       $TCVCHT=["name"=>"TongCvChuaHT","value"=>"$TongCvChuaHoanThanh"];
       $TCVCHT=["name"=>"TongCvChuaHT","value"=>"$TongCvChuaHoanThanh"];
       $TCVCHTQH=["name"=>"TongCvChuaHTQH","value"=>"$TongCvChuaHoanThanhQH"];
       $TCVHT=["name"=>"TongCvHT","value"=>"$TongCvHoanThanh"];
       $TCVHTQH=["name"=>"TongCvHTQH","value"=>"$TongCvHoanThanhQuaHan"];
       $tha=["name"=>"thang","value"=>"$th"];
        $nvtron = [
            "TongCv" => $TongCv,
            "TongCvChuaHT" => $TongCvChuaHoanThanh,
            "TongCvChuaHTQH" => $TongCvChuaHoanThanhQH,
            "TongCvHoanThanh" => $TongCvHoanThanh,
            "TongCvHoanThanhQH" => $TongCvHoanThanhQuaHan,
            "thang"=>$th
        ];
        
        
        return response()->json([$TCV,$TCVCHT,$TCVCHTQH,$TCVHT,$TCVHTQH,$tha]);
        
    }
    if ($id == null) {
        
        return redirect('/api/');
    }
}
}