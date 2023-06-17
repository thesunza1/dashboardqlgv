<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Model\LoaiCongViec;
use Illuminate\Support\Carbon;



class BaoCaoHangNgay extends Model
{
    public $table ='baocaohangngay';
    use HasFactory;
    public function nhanViens()
    {
        return $this->belongsTo('App\Models\NhanVien', 'nv_id', 'nv_id');
    }
    public function scopeSoGioLam($query, $id,$thang){
        return $query
        ->where('nv_id', $id)
        ->whereMonth('bchn_ngay', '=', $thang)
        ->sum('so_gio_lam');
       
    }

    public function scopeSoGioLamT1($query, $id){
        return $query
        ->where('nv_id', $id)
        ->whereMonth('bchn_ngay', '=', 1)
        ->sum('so_gio_lam');
       
    }
    
    public function scopeSoGioLamT2($query, $id){
        return $query
        ->where('nv_id', $id)
        ->whereMonth('bchn_ngay', '=', 2)
        ->sum('so_gio_lam');
       
    }
    
    public function scopeSoGioLamT3($query, $id){
        return $query
        ->where('nv_id', $id)
        ->whereMonth('bchn_ngay', '=', 3)
        ->sum('so_gio_lam');
       
    }
    
    public function scopeSoGioLamT4($query, $id){
        return $query
        ->where('nv_id', $id)
        ->whereMonth('bchn_ngay', '=', 4)
        ->sum('so_gio_lam');
       
    }
    
    public function scopeSoGioLamT5($query, $id){
        return $query
        ->where('nv_id', $id)
        ->whereMonth('bchn_ngay', '=', 5)
        ->sum('so_gio_lam');
       
    }
    
    public function scopeSoGioLamT6($query, $id){
        return $query
        ->where('nv_id', $id)
        ->whereMonth('bchn_ngay', '=', 6)
        ->sum('so_gio_lam');
       
    }
    
    public function scopeSoGioLamT7($query, $id){
        return $query
        ->where('nv_id', $id)
        ->whereMonth('bchn_ngay', '=', 7)
        ->sum('so_gio_lam');
       
    }
    
    public function scopeSoGioLamT8($query, $id){
        return $query
        ->where('nv_id', $id)
        ->whereMonth('bchn_ngay', '=', 8)
        ->sum('so_gio_lam');
       
    }
    
    public function scopeSoGioLamT9($query, $id){
        return $query
        ->where('nv_id', $id)
        ->whereMonth('bchn_ngay', '=', 9)
        ->sum('so_gio_lam');
       
    }
    
    public function scopeSoGioLamT10($query, $id){
        return $query
        ->where('nv_id', $id)
        ->whereMonth('bchn_ngay', '=', 10)
        ->sum('so_gio_lam');
       
    }
    
    public function scopeSoGioLamT11($query, $id){
        return $query
        ->where('nv_id', $id)
        ->whereMonth('bchn_ngay', '=', 11)
        ->sum('so_gio_lam');
       
    }
    
    public function scopeSoGioLamT12($query, $id){
        return $query
        ->where('nv_id', $id)
        ->whereMonth('bchn_ngay', '=', 12)
        ->sum('so_gio_lam');
       
    }

    public function loaiCongViec()
    {
        return $this->belongsTo('App\Models\LoaiCongViec', 'lcv_id');
    }

    public function scopeSoGioLamTheoLcvId($query, $id, $thang)
    {
        $congviecvagio = $query
            ->join('loaicongviec', 'baocaohangngay.lcv_id', '=', 'loaicongviec.lcv_id')
            ->select('loaicongviec.lcv_ten', 'baocaohangngay.so_gio_lam', 'baocaohangngay.lcv_id')
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
                    'so_gio_lam' => "$soGioLam",
                    'lcv_id' => $cv->lcv_id,
                    'thang'=>"$thang"
                ];
            }
        }
    
        // Chuyển mảng kết hợp `congviecvagio_moi` thành mảng tuần tự
        $congviecvagio_moi = array_values($congviecvagio_moi);
    
        return collect($congviecvagio_moi);
    }

    public function scopeSoGioLamTheocvId($query, $id, $thang)
    {
        $congviecvagio1 = $query
            ->join('congviec', 'baocaohangngay.cv_id', '=', 'congviec.cv_id')
            ->select('congviec.cv_ten', 'baocaohangngay.so_gio_lam', 'baocaohangngay.cv_id')
            ->where('baocaohangngay.nv_id', '=', $id)
            ->whereMonth('baocaohangngay.bchn_ngay', '=', $thang)
            ->get();
    
        $soGioLamTheocvId = [];
        foreach ($congviecvagio1 as $cv) {
            $cvId = $cv->cv_id;
            $soGioLam = $cv->so_gio_lam;
            $tong=[];
            if (isset($soGioLamTheocvId[$cvId])) {
                $soGioLamTheocvId[$cvId] += $soGioLam;
            } else {
                $soGioLamTheocvId[$cvId] = $soGioLam;
            }
           
        }
    
        // Tạo một mảng mới `congviecvagio_moi` chỉ với những phần tử không bị trùng lặp và giá trị cột so_gio_lam đã được cộng số giờ làm tương ứng
        $congviecvagio_moi = [];
        foreach ($congviecvagio1 as $cv) {
            $cvId = $cv->cv_id;
            $soGioLam = $soGioLamTheocvId[$cvId];
    
            if (!isset($congviecvagio_moi[$cvId])) {
                $congviecvagio_moi[$cvId] = [
                    'cv_ten' => $cv->cv_ten,
                    'so_gio_lam' => "$soGioLam",
                    'cv_id' => $cv->cv_id
                    
                  
                ];
            }
        }
    
        // Chuyển mảng kết hợp `congviecvagio_moi` thành mảng tuần tự
        $congviecvagio_moi = array_values($congviecvagio_moi);
    
        return collect($congviecvagio_moi);
    }
/***********************************Lãnh đạo**************************************************************** */

public function scopeSoGioLamTheoDv($query, $thang)
{
    $congviecvagio = $query
        ->join('donvi', 'nhanvien.dv_id', '=', 'donvi.dv_id')
        ->join('nhanvien', 'nhanvien.nv_id', '=', 'baocaohangngay.nv_id')
        ->select('donvi.dv_ten', 'baocaohangngay.so_gio_lam')
        ->whereMonth('baocaohangngay.bchn_ngay', '=', $thang)
        ->get();
}
    
        
    

  
}
/**$baocao = DB::table('baocaohangngay')
    
    ->join('nhanvien', 'nhanvien.nv_id', '=', 'baocaohangngay.nv_id')
    ->select('donvi.*', 'baocaohangngay.*', 'nhanvien.*')
    ->where('baocaohangngay.ma_baocao', '=', 'BC001')
    ->get(); */