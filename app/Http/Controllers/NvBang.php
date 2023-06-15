<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;

class NvBang extends Controller
{
    public function bang(Request $request)
    {
    //
    $id=1;
    //$user1=auth()->user();
    //$id=$user1->nv_id;
    $Cha=$request->input('cvCha');
    $thang=$request->input('thang');
    if($Cha&&$thang){
        //Danh sách công việc con
                $CvCon=congviec::CvCon($id,$thang)->get();
                return response()->json(
                [ "CvCon"=>$CvCon]
        
                );
                }
    if($Cha){
        $thang= date('m');
        //Danh sách công việc con
            $CvCon=congviec::CvCon($id,$thang)->get();
            return response()->json(
            [ "CvCon"=>$CvCon]
                    
                            );
                            }
    if($id&&$thang){
        $CvCha = CongViec::CvChaThang($id,$thang)->get();

                    return response()->json(
                        $CvCha
                );
    
                }
    if($id){
    $thang = date('m');
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
return $cvChaThang;

}
    }}