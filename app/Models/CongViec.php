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
    public function nhanVien()
    {
        return $this->belongsTo(NhanVien::class, 'nv_id');
    }
    public function donVi()
    {
        return $this->hasMany('App\Models\DonVi', 'dv_id', 'dv_id');
    }
    
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

public function scopeCvCon($query, $id,$thang) 
{
    //$currentMonth = date('m');
    return $query->select('cv_ten', 'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_cv_cha')
                ->where('nv_id', $id)
               ->where('cv_cv_cha','!=',0)
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
    return $query
                ->select('dv_id','cv_id' ,'cv_tgthuchien', 'cv_hanhoanthanh', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_cv_cha')


                ->where('cv_cv_cha', '=', 0)
                ->where('cv_tiendo','<',100)
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
                })
                ->groupBy('dv_id','cv_id' ,'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_cv_cha')
                ;
                
}

public function scopeBangConDv($query,$thang)
{
    //$currentMonth = date('m');
    return $query
                ->join('nhanvien', 'nhanvien.nv_id', '=', 'congviec.nv_id')
                ->select('nhanvien.nv_ten','congviec.dv_id','congviec.cv_id' ,'congviec.cv_tgthuchien', 'congviec.cv_hanhoanthanh', 'congviec.cv_thgianhoanthanh', 'congviec.cv_trangthai', 'congviec.cv_tiendo', 'congviec.cv_cv_cha')


                ->where('congviec.cv_cv_cha', '=', 0)
                
                ->whereMonth('congviec.CV_THGIANBATDAU', '<=', $thang)
                ->whereYear('congviec.CV_THGIANBATDAU', '<=', Carbon::now()->year)
                ->whereYear('congviec.cv_hanhoanthanh', '>=', Carbon::now()->year)
                ->where(function ($query) use ($thang) {
                    $query->whereNull('congviec.cv_thgianhoanthanh')
                        ->whereMonth('congviec.cv_hanhoanthanh', '>=', $thang)
                        ->orWhere(function ($query) use ($thang) {
                            $query->whereNotNull('congviec.cv_thgianhoanthanh')
                                ->whereMonth('congviec.cv_thgianhoanthanh', '>=', $thang);
                        });
                })
                ->groupBy('nhanvien.nv_ten','congviec.dv_id','congviec.cv_id' ,'congviec.cv_tgthuchien', 'congviec.cv_hanhoanthanh', 'congviec.cv_thgianhoanthanh', 'congviec.cv_trangthai', 'congviec.cv_tiendo', 'congviec.cv_cv_cha');
            }
public function scopeCvDvT($query,$thang)
{
    //$currentMonth = date('m');
    return $query
                ->select('dv_id','cv_id' ,'cv_tgthuchien', 'cv_hanhoanthanh', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_cv_cha')


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
                })
                ->groupBy('dv_id','cv_id' ,'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_cv_cha')
                ;}
public function scopeCvConDv($query, $thang) 
{
    //$currentMonth = date('m');
    return $query->select('cv_ten', 'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'dv_id')
                
               ->where('cv_cv_cha','!=',0)
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
    ->CvDvT($thang)
    
    ->where('cv_tiendo',100)
    ->count();
}
public function scopeCongViecChuaHoanThanhDv($query,$thang){
    $ngay=Carbon::now();
    return $query
    ->CvDvT($thang)
    
    //->where('cv_tiendo',100)
    ->where('cv_trangthai',1)
    ->where('cv_hanhoanthanh','<',$ngay)
    ->count();
}
public function scopeCongViecDangLamDv($query,$thang){
    $ngay=Carbon::now();
    return $query
    ->CvDvT($thang)
    ->where('cv_trangthai',1)
    ->where('cv_tiendo','<',100)
    ->where('cv_hanhoanthanh','>=',$ngay)
    ->count();
}
public function scopeBangDv($query)
    {
        return $query
            ->join('donvi', 'congviec.dv_id', '=', 'donvi.dv_id')
            ->join('nhanvien', 'nhanvien.nv_id', '=', 'congviec.nv_id')
            ->select('nhanvien.nv_ten', 'donvi.dv_id','donvi.dv_id_dvtruong' ,'nhanvien.nv_id')
            ->whereColumn ('donvi.dv_id_dvtruong','=','nhanvien.nv_id')
            
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





}