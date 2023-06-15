<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;
use Illuminate\Support\Carbon;

class LdCot extends Controller
{
    public function cot(Request $request){
        $thang=$request->input('thang');
        $id=1;
        if(!$thang){
            $thang=date('m');
            //$Bang=CongViec::BangDv()->get();
            //return response()->json($Bang);
            if($id){
                $thang = date('m');
                /*$CvCha = CongViec::CvCha($id,$thang)->get();
                $Cvcha1=CongViec::get_CongViec()->get();
                            
                            return response()->json(
                                $Cvcha1
                        );
            
                        }*/
            
                       // Lấy danh sách công việc cha và công việc con
$cvChaThang = CongViec::CvChaThang($id, $thang)->get();
$cvCon = CongViec::CvCon($id, $thang)->get();

// Duyệt mảng công việc con
foreach ($cvCon as $con) {
    // Tìm công việc cha tương ứng bằng cách so sánh cv_cv_cha và cv_id
    $cha = $cvChaThang->where('cv_id', $con->cv_cv_cha)->first();

    // Nếu công việc cha được tìm thấy, thêm công việc con vào mảng công việc con của công việc cha
    if ($cha) {
        if (!isset($cha->congViecCon)) {
            $cha->congViecCon = collect([$con]);
        } else {
            $cha->congViecCon->push($con);
        }
    }
}

// Trả về mảng công việc cha đã được thêm danh sách công việc con vào
return $cvChaThang;}}}}