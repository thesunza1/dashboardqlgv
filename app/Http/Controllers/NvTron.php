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
        $th=$thang;
        

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




       
       
        $nvtron = [
            "TongCv" => $TongCv,
            "TongCvChuaHT" => $TongCvChuaHoanThanh,
            "TongCvChuaHTQH" => $TongCvChuaHoanThanhQH,
            "TongCvHoanThanh" => $TongCvHoanThanh,
            "TongCvHoanThanhQH" => $TongCvHoanThanhQuaHan,
            "thang"=>$th
        ];
        
        
        return response()->json([$nvtron]);
        
    }
    
    
    if ($id) {
        $thang = Carbon::now();
        $th=ltrim((date('m')),'0');
       
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




       
       
        $nvtron = [
            "TongCv" => $TongCv,
            "TongCvChuaHT" => $TongCvChuaHoanThanh,
            "TongCvChuaHTQH" => $TongCvChuaHoanThanhQH,
            "TongCvHoanThanh" => $TongCvHoanThanh,
            "TongCvHoanThanhQH" => $TongCvHoanThanhQuaHan,
            "thang"=>$th
        ];
        
        
        return response()->json([$nvtron]);
        
    }
    if ($id == null) {
        
        return redirect('/api/');
    }
}
}