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
    /*$CvCha = CongViec::CvCha($id,$thang)->get();
    $Cvcha1=CongViec::get_CongViec()->get();
                
                return response()->json(
                    $Cvcha1
            );

            }*/

            // Lấy tất cả các công việc cha và các công việc con của nhân viên
$cv = CongViec::CvChaThang($id, $thang)->get();


// Nhóm tất cả các công việc con theo `cv_cv_cha`
$cvGroupByCha = $cv->groupBy('cv_id');
// Thêm danh sách công việc con vào từng công việc cha
$cvCha = collect();
$cvGroupByCha->each(function ($item, $key) use ($cvCha) {
// Lấy tất cả các công việc con
$cvCon = $item->pluck('cv_cv_cha')->filter();

// Thêm danh sách công việc con vào công việc cha
$item[0]['congViecCon'] = $cvCon;

// Thêm công việc cha vào danh sách
$cvCha->push($item[0]);    
});

// Trả về mảng các công việc cha có công việc con bên trong
return $cvCha;

}
    }}