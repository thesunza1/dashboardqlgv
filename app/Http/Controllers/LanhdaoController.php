<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LanhdaoController extends Controller
{
 
    //
    
    public function lanhdao(Request $request)
    {
        
        $id=1;
        if($id){
            $thang = date('m');
            $TongCvTHT=CongViec::CongViecHoanThanhDv($thang);
            $TongCvTCHT=CongViec::CongViecChuaHoanThanhDv($thang);
            $TongCvTDL=CongViec::CongViecDangLamDv($thang);
            return $TongCvTDL;
        }

}
}