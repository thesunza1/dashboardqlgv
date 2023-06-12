<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

class CongViec extends Model
{
    public $table ='congviec';
    use HasFactory;
    
    public function scopeCvChaThang($query, $id,$thang) 
{
    //$currentMonth = date('m');
    return $query->select('cv_ten', 'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_id')
                ->where('nv_id', $id)
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

public function scopeCvCon($query, $id,$Cha,$thang) 
{
    //$currentMonth = date('m');
    return $query->select('cv_ten', 'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_cv_cha')
                ->where('nv_id', $id)
                ->where('cv_cv_cha', '=', $Cha)
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
    ->whereMonth('cv_hanhoanthanh','<',$thang)
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
public function scopeSoGioLamTheoDv($query, $id, $thang)
    {
        $congviecvagio = $query
            ->join('donvi', 'donvi.dv_id', '=', 'congviec.dv_id')
            ->select('donvi.dv_ten', 'baocaohangngay.so_gio_lam', 'baocaohangngay.lcv_id')
            ->where('baocaohangngay.nv_id', '=', $id)
            ->whereMonth('baocaohangngay.bchn_ngay', '=', $thang)
            ->get();
    
        $soGioLamTheoLcvId = [];
        foreach ($congviecvagio as $cv) {
            $lcvId = $cv->lcv_id;
            $soGioLam = $cv->so_gio_lam;
    
            if (isset($soGioLamTheoLcvId[$lcvId])) {
                $soGioLamTheoLcvId[$lcvId] += $soGioLam;
            } else {
                $soGioLamTheoLcvId[$lcvId] = $soGioLam;
            }
        }
        
    
        // Tạo một mảng mới `congviecvagio_moi` chỉ với những phần tử không bị trùng lặp và giá trị cột so_gio_lam đã được cộng số giờ làm tương ứng
        $congviecvagio_moi = [];
        foreach ($congviecvagio as $cv) {
            $lcvId = $cv->lcv_id;
            $soGioLam = $soGioLamTheoLcvId[$lcvId];
    
            if (!isset($congviecvagio_moi[$lcvId])) {
                $congviecvagio_moi[$lcvId] = [
                    'lcv_ten' => $cv->lcv_ten,
                    'so_gio_lam' => $soGioLam,
                    'lcv_id' => $cv->lcv_id
                ];
            }
        }
    
        // Chuyển mảng kết hợp `congviecvagio_moi` thành mảng tuần tự
        $congviecvagio_moi = array_values($congviecvagio_moi);
    
        return collect($congviecvagio_moi);
    }
}