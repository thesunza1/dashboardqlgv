<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\NhanVien;
use Illuminate\Support\Carbon;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LanhdaoController extends Controller
{
 
    //
    
    public function lanhdao(Request $request)
    {
        //$thang=$request->input('thang');
        $thang=06;
        if($thang){
            
            $th=ltrim($thang,'0');
            $BieuDoCot=NhanVien::SoGioLamTheoDv($thang);
            $ten1=[];
           
            foreach ($BieuDoCot as $donVi => $tyLe) {
                $ten1[]=["name"=>"$donVi","value"=> "$tyLe"];
                
                
            }
            $tha=["name"=>"thang","value"=>"$th"];
            $ten1[]=$tha;
            
            return response()->json($ten1);
            return response()->json($ten1);
        }
        if(!$thang){
            $thang=Carbon::now();
            $month = $thang->format('m');
            $th=ltrim($month,'0');
            $BieuDoCot=NhanVien::SoGioLamTheoDv($thang);
            $ten1=[];
           
            foreach ($BieuDoCot as $donVi => $tyLe) {
                $ten1[]=["name"=>"$donVi","value"=> "$tyLe"];
                
                
            }
            $tha=["name"=>"thang","value"=>"$th"];
            $ten1[]=$tha;
            
            return response()->json($ten1);

}   
    }
}