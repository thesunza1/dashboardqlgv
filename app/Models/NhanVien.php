<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Auth\User;

class NhanVien extends Model implements Authenticatable

{
    use \Illuminate\Auth\Authenticatable;
    
    protected $table = 'nhanvien';
    protected $fillable = [
        'nv_id',
        'nv_taikhoan',
        'nv_matkhau',
        'nv_quyen',
    ];


    use HasFactory;
    public function donVi()
    {
        return $this->belongsTo('App\Models\DonVi', 'dv_id', 'dv_id');
    }

    public function baoCaoHangNgays()
    {
        return $this->hasMany('App\Models\BaoCaoHangNgay', 'nv_id', 'nv_id');
    }
    public function scopeSoGioLamTheoDv($query, $thang)
    {
        $congviecvagio = $query
            ->join('donvi', 'nhanvien.dv_id', '=', 'donvi.dv_id')
            ->join('baocaohangngay', 'nhanvien.nv_id', '=', 'baocaohangngay.nv_id')
            ->select('donvi.dv_ten', 'baocaohangngay.so_gio_lam')
            ->whereMonth('baocaohangngay.bchn_ngay', '=', $thang)
            ->get();
            $data = [];

    foreach ($congviecvagio as $row) {
        if (!isset($data[$row->dv_ten])) {
            $data[$row->dv_ten] = [
                'total_gio_lam' => 0,
                'total_bao_cao' => 0,
            ];
        }
        $data[$row->dv_ten]['total_gio_lam'] += $row->so_gio_lam;
        $data[$row->dv_ten]['total_bao_cao']++;
    }

    $tylelamviec = [];

    foreach ($data as $donVi => $info) {
        $tylelamviec[$donVi] = $info['total_gio_lam'] / $info['total_bao_cao'];
    }

    return $tylelamviec;
}}