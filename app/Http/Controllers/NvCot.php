<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;

class NvCot extends Controller
{
    public function cot(Request $request)
    {
        $id = 1;
        $thang = $request->input('thang');

        if($id&&$thang){
            //thời gian thực hiện công việc của tháng hiện tại
            $TongGioLam = BaoCaoHangNgay::SoGioLam($id,$thang);

//thời gian thực hiện công việc của tháng 1
            $TongGioLamT1 = BaoCaoHangNgay::SoGioLamT1($id);
               
//thời gian thực hiện công việc của tháng 2
            $TongGioLamT2 = BaoCaoHangNgay::SoGioLamT2($id);

//thời gian thực hiện công việc của tháng 3
            $TongGioLamT3 = BaoCaoHangNgay::SoGioLamT3($id);

//thời gian thực hiện công việc của tháng 4
            $TongGioLamT4 = BaoCaoHangNgay::SoGioLamT4($id);

//thời gian thực hiện công việc của tháng 5
            $TongGioLamT5 = BaoCaoHangNgay::SoGioLamT5($id);

//thời gian thực hiện công việc của tháng 6
            $TongGioLamT6 = BaoCaoHangNgay::SoGioLamT6($id);

//thời gian thực hiện công việc của tháng 7
            $TongGioLamT7 = BaoCaoHangNgay::SoGioLamT7($id);

//thời gian thực hiện công việc của tháng 8
            $TongGioLamT8 = BaoCaoHangNgay::SoGioLamT8($id);

//thời gian thực hiện công việc của tháng 9
            
            $TongGioLamT9 = BaoCaoHangNgay::SoGioLamT9($id);
//thời gian thực hiện công việc của tháng 10
            
            $TongGioLamT10 = BaoCaoHangNgay::SoGioLamT10($id);
//thời gian thực hiện công việc của tháng 11
            $TongGioLamT11 = BaoCaoHangNgay::SoGioLamT11($id);

//thời gian thực hiện công việc của tháng 12
            $TongGioLamT12 = BaoCaoHangNgay::SoGioLamT12($id);

            $nvcot= [
                "TongGioLam" => $TongGioLam,
                "TongGioLamT1" => $TongGioLamT1,
                "TongGioLamT2" => $TongGioLamT2,
                "TongGioLamT3" => $TongGioLamT3,
                "TongGioLamT4" => $TongGioLamT4,
                "TongGioLamT5" => $TongGioLamT5,
                "TongGioLamT6" => $TongGioLamT6,
                "TongGioLamT7" => $TongGioLamT7,
                "TongGioLamT8" => $TongGioLamT8,
                "TongGioLamT9" => $TongGioLamT9,
                "TongGioLamT10" => $TongGioLamT10,
                "TongGioLamT11" => $TongGioLamT11,
                "TongGioLamT12" => $TongGioLamT12
               
            ];
            return response()->json([$nvcot]);

        }


        if($id){
            //thời gian thực hiện công việc của tháng hiện tại
            $TongGioLam = BaoCaoHangNgay::SoGioLam($id,$thang);

//thời gian thực hiện công việc của tháng 1
            $TongGioLamT1 = BaoCaoHangNgay::SoGioLamT1($id);
               
//thời gian thực hiện công việc của tháng 2
            $TongGioLamT2 = BaoCaoHangNgay::SoGioLamT2($id);

//thời gian thực hiện công việc của tháng 3
            $TongGioLamT3 = BaoCaoHangNgay::SoGioLamT3($id);

//thời gian thực hiện công việc của tháng 4
            $TongGioLamT4 = BaoCaoHangNgay::SoGioLamT4($id);

//thời gian thực hiện công việc của tháng 5
            $TongGioLamT5 = BaoCaoHangNgay::SoGioLamT5($id);

//thời gian thực hiện công việc của tháng 6
            $TongGioLamT6 = BaoCaoHangNgay::SoGioLamT6($id);

//thời gian thực hiện công việc của tháng 7
            $TongGioLamT7 = BaoCaoHangNgay::SoGioLamT7($id);

//thời gian thực hiện công việc của tháng 8
            $TongGioLamT8 = BaoCaoHangNgay::SoGioLamT8($id);

//thời gian thực hiện công việc của tháng 9
            
            $TongGioLamT9 = BaoCaoHangNgay::SoGioLamT9($id);
//thời gian thực hiện công việc của tháng 10
            
            $TongGioLamT10 = BaoCaoHangNgay::SoGioLamT10($id);
//thời gian thực hiện công việc của tháng 11
            $TongGioLamT11 = BaoCaoHangNgay::SoGioLamT11($id);

//thời gian thực hiện công việc của tháng 12
            $TongGioLamT12 = BaoCaoHangNgay::SoGioLamT12($id);

            $nvcot= [
                "TongGioLam" => $TongGioLam,
                "TongGioLamT1" => $TongGioLamT1,
                "TongGioLamT2" => $TongGioLamT2,
                "TongGioLamT3" => $TongGioLamT3,
                "TongGioLamT4" => $TongGioLamT4,
                "TongGioLamT5" => $TongGioLamT5,
                "TongGioLamT6" => $TongGioLamT6,
                "TongGioLamT7" => $TongGioLamT7,
                "TongGioLamT8" => $TongGioLamT8,
                "TongGioLamT9" => $TongGioLamT9,
                "TongGioLamT10" => $TongGioLamT10,
                "TongGioLamT11" => $TongGioLamT11,
                "TongGioLamT12" => $TongGioLamT12
               
            ];
            return response()->json([$nvcot]);

        }
}
}