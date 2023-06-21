<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;
use App\Models\NhanVien;
use App\Models\DonVi;
use Illuminate\Support\Carbon;

class LdCot extends Controller
{
    public function cot(Request $request){
        $thang=$request->input('thang');
        
        
        $ThangHienTai=date('m');
        if($thang&&$thang!=$ThangHienTai){
            
            $nam = date('y');

            $hientai = date('Y-m-t', mktime(0, 0, 0, $thang+1, 0, $nam));
            
            $ngay = date('Y-m-d', strtotime('+3 days', strtotime($hientai))); // Trừ đi 3 ngày
           
            
            $donvi = DonVi::select('dv_id', 'dv_ten')->get();
            $congviec = CongViec::CvDvT($thang)->get();
            $congviecs = CongViec::BangConDv($thang)->get();
            $TruongPhong=NhanVien::BangDv()->get();
    
    //return $TruongPhong;


$result = array();
foreach ($donvi as $value) {
    // Khởi tạo các biến
    $tongcv = 0;
    $sapdenhan = 0;
    $hethan = 0;
    $tongcv=0;
    $ten="";
    // Lặp qua các công việc
    foreach ($congviec as $cv) {
      
        if ($cv->dv_id == $value->dv_id) {
            
            if ($cv->cv_trangthai > 1) { // Đang thực hiện
                $tongcv++; // Tăng tổng công việc lên 1
            }
            if ($cv->cv_hanhoanthanh >= $hientai && $cv->cv_hanhoanthanh <= $ngay) { // Sắp đến hạn hoàn thành
                $sapdenhan++; // Tăng số lượng công việc sắp hết hạn lên 1
            }
            if ( $hientai>$cv->cv_hanhoanthanh ) { // Hết hạn hoàn thành
                $hethan++; // Tăng số lượng công việc đã hết hạn hoàn thành lên 1
            }
        }
    }
    foreach ($TruongPhong as $Tp) {
        if($Tp->dv_id==$value->dv_id){
            $ten=$Tp->nv_ten;
        }
    
    }
    
    // Kiểm tra nếu dv_id đã có trong mảng $result thì thêm công việc mới vào mảng CvCon
    $CvConArray = array(); // Khởi tạo mảng chứa các mảng CvCon
    foreach ($congviecs as $key => $valueCv) { // Duyệt qua từng phần tử của mảng CvCon
        if ($valueCv->dv_id == $value->dv_id) { // Kiểm tra nếu dv_id giống nhau
            $CvConArray[] = $valueCv; // Thêm mảng CvCon tương ứng vào mảng $CvConArray
        }
    }
        $total=$sapdenhan+$hethan;
        $tile=($tongcv-$total)/$tongcv*100;
        // Thêm mới một phần tử vào mảng $result
        $result[] = array(
            'dv_id' => $value->dv_id,
            'dv_ten' => $value->dv_ten,
            'tongcv' => $tongcv,
            'sapdenhan' => $sapdenhan,
            'hethan' => $hethan,
            'tile'=>$tile,
            'tentruongphong' => $ten,
            'CvCon' => $CvConArray
        );
    
    
}



            // Xuất kết quả
            return response()->json($result);
}
        if(!$thang||$thang==$ThangHienTai){
            $thang = date('m');
            $tha=Carbon::now();
            $hientai = date('Y-m-d'); // Lấy ngày hiện tại
            $ngay = date('Y-m-d', strtotime('+3 days', strtotime($hientai))); // Trừ đi 3 ngày
            
            
    $donvi = DonVi::select('dv_id', 'dv_ten')->get();
    $congviec = CongViec::CvDvT($thang)->get();
    $congviecs = CongViec::BangConDv($thang)->get();
    $TruongPhong=NhanVien::BangDv()->get();
    
    //return $TruongPhong;


$result = array();
foreach ($donvi as $value) {
    // Khởi tạo các biến
    $tongcv = 0;
    $sapdenhan = 0;
    $hethan = 0;
    $tongcv=0;
    $ten="";
    $tile=0;
    // Lặp qua các công việc
    foreach ($congviec as $cv) {
      
        if ($cv->dv_id == $value->dv_id) {
            
            if ($cv->cv_trangthai > 1) { // Đang thực hiện
                $tongcv++; // Tăng tổng công việc lên 1
            }
            if ($cv->cv_trangthai > 1&&$cv->cv_hanhoanthanh >= $hientai && $cv->cv_hanhoanthanh <= $ngay) { // Sắp đến hạn hoàn thành
                $sapdenhan++; // Tăng số lượng công việc sắp hết hạn lên 1
            }
            if ( $cv->cv_trangthai > 1&&$hientai>$cv->cv_hanhoanthanh ) { // Hết hạn hoàn thành
                $hethan++; // Tăng số lượng công việc đã hết hạn hoàn thành lên 1
            }
        }
    }
    foreach ($TruongPhong as $Tp) {
        if($Tp->dv_id==$value->dv_id){
            $ten=$Tp->nv_ten;
        }
    
    }
    
    // Kiểm tra nếu dv_id đã có trong mảng $result thì thêm công việc mới vào mảng CvCon
    $CvConArray = array(); // Khởi tạo mảng chứa các mảng CvCon
    foreach ($congviecs as $key => $valueCv) { // Duyệt qua từng phần tử của mảng CvCon
        if ($valueCv->dv_id == $value->dv_id) { // Kiểm tra nếu dv_id giống nhau
            $CvConArray[] = $valueCv; // Thêm mảng CvCon tương ứng vào mảng $CvConArray
        }
    }
    if($tongcv!=0){
    $total=$sapdenhan+$hethan;
    $tile=($tongcv-$total)/$tongcv*100;}
        // Thêm mới một phần tử vào mảng $result
        $result[] = array(
            'dv_id' => $value->dv_id,
            'dv_ten' => $value->dv_ten,
            'tongcv' => $tongcv,
            'sapdenhan' => $sapdenhan,
            'hethan' => $hethan,
            'tile'=>$tile,
            'tentruongphong' => $ten,
            'CvCon' => $CvConArray
        );
    
    
}



// Xuất kết quả
return response()->json($result);



}}}