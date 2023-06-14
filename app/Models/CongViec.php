<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

class CongViec extends Model
{
    public $table ='congviec';
    use HasFactory;
    public function donVi()
    {
        return $this->hasMany('App\Models\DonVi', 'dv_id', 'dv_id');
    }
    
    public function scopeCvChaThang($query, $id,$thang) 
{
    //$currentMonth = date('m');
    return $query->select('cv_ten', 'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_id')
                ->where('nv_id', $id)
                //->where('cv_cv_cha', '=', 0)
                ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
                ->whereYear('CV_THGIANBATDAU', '<=', Carbon::now()->year)
                ->whereYear('cv_hanhoanthanh', '>=', Carbon::now()->year)
                ->where(function ($query) use ($thang) {
                    $query->whereNull('cv_thgianhoanthanh')
                        ->whereMonth('cv_hanhoanthanh', '>=', $thang)
                        ->orWhere(function ($query) use ($thang) {
                            $query->whereNotNull('cv_thgianhoanthanh')
                                ->whereMonth('cv_thgianhoanthanh', '>=', $thang);
                        });
                });
}

public function scopeCvCon($query, $id,$thang) 
{
    //$currentMonth = date('m');
    return $query->select('cv_ten', 'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_cv_cha')
                ->where('nv_id', $id)
               
                ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
                ->whereYear('CV_THGIANBATDAU', '<=', Carbon::now()->year)
                ->whereYear('cv_hanhoanthanh', '>=', Carbon::now()->year)
                ->where(function ($query) use ($thang) {
                    $query->whereNull('cv_thgianhoanthanh')
                        ->whereMonth('cv_hanhoanthanh', '>=', $thang)
                        ->orWhere(function ($query) use ($thang) {
                            $query->whereNotNull('cv_thgianhoanthanh')
                                ->whereMonth('cv_thgianhoanthanh', '>=', $thang);
                        });
                });
}
public function scopeCvChaCon($query, $id,$thang) {
    return $query->select('cv_ten', 'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_cv_cha')
                ->CvChaThang($id,$thang)
                -> $this
                ->hasMany(CongViec::class, 'cv_cv_cha', 'cv_id')
                ->with('subtasks');
            }

public function scopeCountCvChaThang($query, $id,$thang)
{
    return $query
                ->CvChaThang($id,$thang)
                ->count();
}
public function scopeCongViecHoanThanh($query, $id,$thang){
    return $query
    ->CvChaThang($id,$thang)
    ->where('cv_tiendo',100)
    ->count();
}
public function scopeCongViecHoanThanhQuaHan($query, $id,$thang){
    return $query
    ->CvChaThang($id,$thang)
    ->where('cv_tiendo',100)
    ->whereColumn('cv_thgianhoanthanh','>','cv_hanhoanthanh')
    ->count();
}
public function scopeCongViecChuaHoanThanh($query, $id,$thang){
    return $query
    ->CvChaThang($id,$thang)
    ->where('cv_tiendo','<',100)
    ->count();
}
public function scopeCongViecChuaHoanThanhQH($query, $id,$thang){
    return $query
    ->where('cv_hanhoanthanh','<',$thang)
    ->CvChaThang($id,$thang)
    ->where('cv_tiendo','<',100)
    
    ->count();
}

/*********************************************Theo đơn vị*********************************** */

public function scopeCvDv($query,$thang)
{
    //$currentMonth = date('m');
    return $query->select('cv_ten', 'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_id')

                ->where('cv_cv_cha', '=', 0)
                ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
                ->whereYear('CV_THGIANBATDAU', '<=', Carbon::now()->year)
                ->whereYear('cv_hanhoanthanh', '>=', Carbon::now()->year)
                ->where(function ($query) use ($thang) {
                    $query->whereNull('cv_thgianhoanthanh')
                        ->whereMonth('cv_hanhoanthanh', '>=', $thang)
                        ->orWhere(function ($query) use ($thang) {
                            $query->whereNotNull('cv_thgianhoanthanh')
                                ->whereMonth('cv_thgianhoanthanh', '>=', $thang);
                        });
                });
}
public function scopeCongViecHoanThanhDv($query,$thang){
    return $query
    ->CvDv($thang)
    ->where('cv_tiendo',100)
    ->count();
}
public function scopeCongViecChuaHoanThanhDv($query,$thang){
    return $query
    ->CvDv($thang)
    ->where('cv_tiendo',100)
    ->wherecolumn('cv_hanhoanthanh','<','cv_thgianhoanthanh')
    ->count();
}
public function scopeCongViecDangLamDv($query,$thang){
    $ngay=Carbon::now();
    return $query
    ->CvDv($thang)
    ->where('cv_tiendo','<',100)
    ->where('cv_hanhoanthanh','>=',$ngay)
    ->count();
}
public function scopeBangDv($query)
    {
        return $query
            ->join('donvi', 'congviec.dv_id', '=', 'donvi.dv_id')
            ->join('nhanvien', 'nhanvien.nv_id', '=', 'congviec.nv_id')
            ->select('nhanvien.nv_ten', 'congviec.cv_trangthai')
            ->wherecolumn('donvi.dv_id_dvtruong','=','nhanvien.nv_id')
            
            ;
        
        }

public function scopeBangDv1($query)
        {
            return $query
                ->join('donvi', 'congviec.dv_id', '=', 'donvi.dv_id')
                ->join('nhanvien', 'nhanvien.nv_id', '=', 'congviec.nv_id')
                ->select('donvi.dv_ten', 'congviec.cv_trangthai','congviec.cv_hanhoanthanh',)
                
                
                ;
            
            }




/********************************************************************************************************** */



public function nhanVien()
    {
        return $this->belongsTo(NhanVien::class, 'nv_id');
    }
//public function get_CongViec(Request $request)
   // {
      /*  $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Người dùng chưa đăng nhập'], 401);
        }

        try {*/
            /*$userId = 1;

            // Lấy danh sách công việc dựa trên các tham số CV_ID và CV_CVCha của người dùng đang đăng nhập
            $danhSachCongViec = CongViec::where('nv_id', $userId)
                ->with('nhanVien', 'keHoachs', 'duAns', 'nhomCongViecs', 'donVi', 'cv_cv_cha')
                ->get();

            // Tạo một mảng chứa thông tin các công việc
            $congViecData = [];

            foreach ($danhSachCongViec as $congViec) {
                // Lấy thông tin nhân viên
                $nhanVien = $congViec->nhanVien;
                $keHoachs = $congViec->keHoachs;
                $duAns = $congViec->duAns;
                $cv_cv_cha = $congViec->cv_cv_cha;
                $nhomCongViecs = $congViec->nhomCongViecs;
                $donVi = $congViec->donVi;
                $congViecCha = null;

                if ($cv_cv_cha) {
                    // Nếu tồn tại giá trị cv_cv_cha, truy xuất công việc cha dựa trên cv_id
                    $congViecCha = CongViec::find($cv_cv_cha);
                }

                // Tạo một mảng chứa thông tin của công việc
                $congViecItem = [
                    'cv_id' => $congViec->cv_id,
                    'cv_ten' => $congViec->cv_ten,
                    // Thêm các thông tin khác của công việc cần lấy
                    'nhan_vien' => $nhanVien ? [
                        'ten_nhan_vien' => $nhanVien->nv_ten,
                        // Thêm các thông tin khác của nhân viên cần lấy
                    ] : null,
                    'ke_hoach' => $keHoachs ? [
                        'ten_ke_hoach' => $keHoachs->kh_ten,
                        // Thêm các thông tin khác của keHoachs cần lấy
                    ] : null,
                    'du_an' => $duAns ? [
                        'ten_du_an' => $duAns->da_ten,
                        // Thêm các thông tin khác của duAns cần lấy
                    ] : null,
                    'nhom_cong_viec' => $nhomCongViecs ? [
                        'ten_nhom_cong_viec' => $nhomCongViecs->n_cv_ten,
                        // Thêm các thông tin khác của nhomCongViecs cần lấy
                    ] : null,
                    'cong_viec_cha' => $congViecCha ? [
                        'ten_cong_viec_cha' => $congViecCha->cv_ten,
                        // Thêm các thông tin khác của công việc cha cần lấy
                    ] : null,
                    'don_vi' => $donVi ? [
                        'ten_don_vi' => $donVi->dv_ten,
                        // Thêm các thông tin khác của donVi cần lấy
                    ] : null,
];

                // Thêm công việc vào mảng chứa thông tin
                $congViecData[] = $congViecItem;
            }

            // Trả về dữ liệu JSON
            return response()->json($congViecData);
        } 

    // Đăng ký quan hệ one-to-many với mô hình CongViec để lấy tất cả các công việc con của công việc cha
    */
}