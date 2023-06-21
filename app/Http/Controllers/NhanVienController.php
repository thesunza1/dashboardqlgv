<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\NhanVien;
use App\Http\Controllers\Admin\logincontroller;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;

class NhanVienController extends Controller
{



    public function index(Request $request)
    {
        $id = 1;
        $thang = $request->input('thang');
        

        if ($id && $thang) {
            $thang=ltrim($thang,'0');
            
            
            //công việc và giờ làm được giao trong tháng 

            $CongViecVaGio = BaoCaoHangNgay::SoGioLamTheoLcvId($id, $thang);
            $thangh=["name"=>"thang","month"=>$thang];
            $CongViecVaGio[]=$thangh;
            return response()->json(
                $CongViecVaGio         
                );
        }


        
        if ($id) {
            $thang = date('m');
            $thang=ltrim($thang,'0');
            
 //công việc và giờ làm được giao trong tháng 5

 $CongViecVaGio = BaoCaoHangNgay::SoGioLamTheoLcvId($id, $thang);
 $thangh=["name"=>"thang","month"=>$thang];
$CongViecVaGio[]=$thangh;
 return response()->json(
     $CongViecVaGio         
     );
}

           

            
            
            
        
        if ($id == null) {
            
            return redirect('/api/');
        }
    }
}
