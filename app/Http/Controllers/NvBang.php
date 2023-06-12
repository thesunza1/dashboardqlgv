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
    if($id&&$thang){
        $CvCha = CongViec::CvChaThang($id,$thang)->get();
        if($Cha){
            //Danh sách công việc con
                        $CvCon=congviec::CvCon($id,$thang)->get();
                        return response()->json(
                       [ "CvCon"=>$CvCon]
            
                    );
                    }
                    return response()->json(
                        $CvCha
                );
    
                }
    if($id){
    $thang = date('m');
    $CvCha = CongViec::CvChaThang($id,$thang)->get();
    if($Cha){
        //Danh sách công việc con
                    $CvCon=congviec::CvCon($id,$thang)->get();
                    return response()->json(
                   [ "CvCon"=>$CvCon]
        
                );
                }
                return response()->json(
                    $CvCha
            );

            }
}
}