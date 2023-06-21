<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;
use Carbon\Carbon;

class NvCot extends Controller
{
    public function cot(Request $request)
    {
        $id = 1;
        $thang = $request->input('thang');
        
        if($id&&$thang){
            
            
            $th=ltrim($thang,'0');
            //thời gian thực hiện công việc của tháng hiện tại
            $TongGioLam = BaoCaoHangNgay::SoGioLam($id,$thang);

            
            //thời gian thực hiện công việc của tháng hiện tại
            $TongGioLam = BaoCaoHangNgay::SoGioLam($id,$thang);

            $GCv=BaoCaoHangNgay::SoGioLamTheocvId($id, $thang);
            


           
            $Gio= ["name"=>"TongGioLam","value" => $TongGioLam];
            $tha= [ "name"=>"thang","month"=>"$th"];
            
            $GCv[]=$Gio;
            $GCv[]=$tha;
            
            return response()->json($GCv);
        }


        if($id){
            
            $thang=Carbon::now();
            $month = $thang->format('m');
            $th=ltrim($month,'0');
            //thời gian thực hiện công việc của tháng hiện tại
            $TongGioLam = BaoCaoHangNgay::SoGioLam($id,$thang);

            $GCv=BaoCaoHangNgay::SoGioLamTheocvId($id, $thang);
            


           
            $Gio= ["name"=>"TongGioLam","value" => $TongGioLam];
            $tha= [ "name"=>"thang","month"=>"$th"];
            $GCv[]=$Gio;
            $GCv[]=$tha;
            
            return response()->json($GCv);
            
        }
}
}