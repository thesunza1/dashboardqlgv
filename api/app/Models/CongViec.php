<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;


class CongViec extends Model
{
    public $table = 'congviec';
    use HasFactory;
    public function nhanVien()
    {
        return $this->belongsTo(NhanVien::class, 'nv_id', 'nv_id');
    }
    public function donVi()
    {
        return $this->hasMany('App\Models\DonVi', 'dv_id', 'dv_id');
    }

    public function scopeCvChaThang($query, $id, $thang)
    {
        //$currentMonth = date('m');
        return $query->select('cv_ten', 'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_id')
            ->where('nv_id', $id)
            ->where('cv_cv_cha', '=', 0)
            ->where('cv_trangthai', '>', 1)
            ->where('cv_trangthai', '<', 5)
            ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
            ->where(function ($query) use ($thang) {
                $query->whereNull('cv_thgianhoanthanh')
                    ->whereMonth('cv_hanhoanthanh', '>=', $thang)
                    ->orWhere(function ($query) use ($thang) {
                        $query->whereNotNull('cv_thgianhoanthanh')
                            ->whereMonth('cv_thgianhoanthanh', '>=', $thang);
                    });
            });
    }

    public function scopeCvCon($query, $id, $thang)
    {
        //$currentMonth = date('m');
        return $query->join('nhanvien', 'nhanvien.nv_id', '=', 'congviec.nv_id')
            ->select('congviec.cv_ten', 'nhanvien.nv_ten', 'congviec.cv_tgthuchien', 'congviec.CV_HANHOANTHANH', 'congviec.cv_thgianhoanthanh', 'congviec.cv_trangthai', 'congviec.cv_tiendo', 'congviec.cv_cv_cha as cv_id')
            ->where('cv_trangthai', '>', 1)
            ->where('cv_trangthai', '<', 5)
            ->where('congviec.nv_id', $id)
            ->where('congviec.cv_cv_cha', '!=', 0)
            ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
            ->where(function ($query) use ($thang) {
                $query->whereNull('congviec.cv_thgianhoanthanh')
                    ->whereMonth('congviec.cv_hanhoanthanh', '>=', $thang)
                    ->orWhere(function ($query) use ($thang) {
                        $query->whereNotNull('congviec.cv_thgianhoanthanh')
                            ->whereMonth('congviec.cv_thgianhoanthanh', '>=', $thang);
                    });
            });
    }

    public function scopeSoGioLam($query, $id, $thang)
    {
        return $query
            ->where('nv_id', $id)
            ->where('cv_trangthai', '>', 1)
            ->where('cv_trangthai', '<', 5)
            ->where('cv_cv_cha', 0)
            ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
            ->where(function ($query) use ($thang) {
                $query->whereNull('cv_thgianhoanthanh')
                    ->whereMonth('cv_hanhoanthanh', '>=', $thang)
                    ->orWhere(function ($query) use ($thang) {
                        $query->whereNotNull('cv_thgianhoanthanh')
                            ->whereMonth('cv_thgianhoanthanh', '>=', $thang);
                    });
            })
            ->sum('cv_tgthuchien');
    }


    public function scopeSoGioLamTheoLcvId($query, $id, $thang)
    {
        $congviecvagio = $query
            ->join('loaicongviec', 'congviec.lcv_id', '=', 'loaicongviec.lcv_id')
            ->select('loaicongviec.lcv_ten', 'congviec.cv_tgthuchien', 'congviec.lcv_id')
            ->where('congviec.nv_id', '=', $id)
            ->where('cv_trangthai', '>', 1)
            ->where('cv_trangthai', '<', 5)
            ->where('cv_cv_cha', 0)
            ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
            ->where(function ($query) use ($thang) {
                $query->whereNull('cv_thgianhoanthanh')
                    ->whereMonth('cv_hanhoanthanh', '>=', $thang)
                    ->orWhere(function ($query) use ($thang) {
                        $query->whereNotNull('cv_thgianhoanthanh')
                            ->whereMonth('cv_thgianhoanthanh', '>=', $thang);
                    });
            })
            ->get();

        $soGioLamTheoLcvId = [];
        foreach ($congviecvagio as $cv) {
            $lcvId = $cv->lcv_id;
            $soGioLam = $cv->cv_tgthuchien;

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

            ->select('cv_ten', 'cv_tgthuchien', 'cv_id')
            ->where('nv_id', '=', $id)
            ->where('cv_cv_cha', 0)
            ->where('cv_trangthai', '>', 1)
            ->where('cv_trangthai', '<', 5)
            ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
            ->where(function ($query) use ($thang) {
                $query->whereNull('cv_thgianhoanthanh')
                    ->whereMonth('cv_hanhoanthanh', '>=', $thang)
                    ->orWhere(function ($query) use ($thang) {
                        $query->whereNotNull('cv_thgianhoanthanh')
                            ->whereMonth('cv_thgianhoanthanh', '>=', $thang);
                    });
            })
            ->get();

        $soGioLamTheocvId = [];
        foreach ($congviecvagio1 as $cv) {
            $cvId = $cv->cv_id;
            $soGioLam = $cv->cv_tgthuchien;
            $tong = [];
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


    public function scopeCountCvChaThang($query, $id, $thang)
    {
        return $query
            ->CvChaThang($id, $thang)
            ->count();
    }
    public function scopeCongViecHoanThanh($query, $id, $thang)
    {
        return $query
            ->CvChaThang($id, $thang)
            ->where('cv_trangthai', 3)
            ->count();
    }
    public function scopeCongViecHoanThanhQuaHan($query, $id, $thang)
    {
        return $query
            ->CvChaThang($id, $thang)
            ->where('cv_tiendo', 100)
            ->where('cv_trangthai', 4)
            //->whereColumn('cv_thgianhoanthanh', '>', 'cv_hanhoanthanh')
            ->count();
    }
    public function scopeCongViecChuaHoanThanh($query, $id, $thang)
    {
        return $query
            ->CvChaThang($id, $thang)
            ->where('cv_trangthai', 2)
            ->count();
    }
    public function scopeCongViecChuaHoanThanhQH($query, $id, $thang)
    {
        return $query
            ->CvChaThang($id, $thang)
            ->where('cv_trangthai', '=', 4)

            ->where('cv_tiendo', '<', 100)

            ->count();
    }

    /*********************************************Theo đơn vị*********************************** */

    public function scopeCvDv($query, $thang)
    {
        //$currentMonth = date('m');
        return $query
            ->select('dv_id', 'cv_id', 'cv_tgthuchien', 'cv_hanhoanthanh', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_cv_cha')


            ->where('cv_cv_cha', '=', 0)
            ->where('cv_tiendo', '<', 100)
            ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
            ->where(function ($query) use ($thang) {
                $query->whereNull('cv_thgianhoanthanh')
                    ->whereMonth('cv_hanhoanthanh', '>=', $thang)
                    ->orWhere(function ($query) use ($thang) {
                        $query->whereNotNull('cv_thgianhoanthanh')
                            ->whereMonth('cv_thgianhoanthanh', '>=', $thang);
                    });
            })
            ->groupBy('dv_id', 'cv_id', 'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_cv_cha');
    }

    public function scopeBangConDv($query, $thang)
    {
        //$currentMonth = date('m');
        return $query
            ->join('nhanvien', 'nhanvien.nv_id', '=', 'congviec.nv_id')
            ->select('nhanvien.nv_ten', 'congviec.cv_ten', 'congviec.dv_id', 'congviec.cv_id', 'congviec.cv_tgthuchien', 'congviec.cv_hanhoanthanh', 'congviec.cv_thgianhoanthanh', 'congviec.cv_trangthai', 'congviec.cv_tiendo', 'congviec.cv_cv_cha')


            ->where('congviec.cv_cv_cha', '=', 0)
            ->where('congviec.cv_trangthai', '>', 1)
            ->where('congviec.cv_trangthai', '<', 5)
            ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
            ->where(function ($query) use ($thang) {
                $query->whereNull('congviec.cv_thgianhoanthanh')
                    ->whereMonth('congviec.cv_hanhoanthanh', '>=', $thang)
                    ->orWhere(function ($query) use ($thang) {
                        $query->whereNotNull('congviec.cv_thgianhoanthanh')
                            ->whereMonth('congviec.cv_thgianhoanthanh', '>=', $thang);
                    });
            })
            ->groupBy('nhanvien.nv_ten', 'congviec.cv_ten', 'congviec.dv_id', 'congviec.cv_id', 'congviec.cv_tgthuchien', 'congviec.cv_hanhoanthanh', 'congviec.cv_thgianhoanthanh', 'congviec.cv_trangthai', 'congviec.cv_tiendo', 'congviec.cv_cv_cha');
    }
    public function scopeCvDvT($query, $thang)
    {
        //$currentMonth = date('m');
        return $query
            ->select('dv_id', 'cv_id', 'cv_tgthuchien', 'cv_hanhoanthanh', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_cv_cha')


            ->where('cv_cv_cha', '=', 0)

            ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
            ->where(function ($query) use ($thang) {
                $query->whereNull('cv_thgianhoanthanh')
                    ->whereMonth('cv_hanhoanthanh', '>=', $thang)
                    ->orWhere(function ($query) use ($thang) {
                        $query->whereNotNull('cv_thgianhoanthanh')
                            ->whereMonth('cv_thgianhoanthanh', '>=', $thang);
                    });
            })
            ->groupBy('dv_id', 'cv_id', 'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_cv_cha');
    }
    public function scopeCvConDv($query, $thang)
    {
        //$currentMonth = date('m');
        return $query->select('cv_ten', 'cv_tgthuchien', 'CV_HANHOANTHANH', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'dv_id')

            ->where('cv_cv_cha', '!=', 0)
            ->where('congviec.cv_trangthai', '>', 1)
            ->where('congviec.cv_trangthai', '<', 5)
            ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
            ->where(function ($query) use ($thang) {
                $query->whereNull('cv_thgianhoanthanh')
                    ->whereMonth('cv_hanhoanthanh', '>=', $thang)
                    ->orWhere(function ($query) use ($thang) {
                        $query->whereNotNull('cv_thgianhoanthanh')
                            ->whereMonth('cv_thgianhoanthanh', '>=', $thang);
                    });
            });
    }
    public function scopeCongViecHoanThanhDv($query, $thang)
    {
        return $query
            ->CvDvT($thang)

            ->where('cv_trangthai', 3)
            ->count();
    }
    public function scopeCongViecChuaHoanThanhDv($query, $thang)
    {

        return $query
            ->CvDvT($thang)

            //->where('cv_tiendo',100)
            ->where('cv_trangthai', '=', 4)
            ->count();
    }
    public function scopeCongViecDangLamDv($query, $thang)
    {

        return $query
            ->select('dv_id', 'cv_id', 'cv_tgthuchien', 'cv_hanhoanthanh', 'cv_thgianhoanthanh', 'cv_trangthai', 'cv_tiendo', 'cv_cv_cha')


            ->where('cv_cv_cha', '=', 0)
            ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
            ->where('congviec.cv_trangthai', 2)
            // ->where('congviec.cv_trangthai', '>', 1)
            // ->where('congviec.cv_trangthai', '<', 5)
            ->where('cv_tiendo', '<', 100)
            ->where(function ($query) use ($thang) {
                $query->whereNull('cv_thgianhoanthanh')
                    ->wheremonth('cv_hanhoanthanh', '<', $thang)
                    ->orWhere(function ($query) use ($thang) {
                        $query->whereNotNull('cv_thgianhoanthanh')
                            ->wherecolumn('cv_hanhoanthanh', '<', 'cv_thgianhoanthanh');
                    });
            })
            ->count();
    }
    public function scopeBangDv($query)
    {
        return $query
            ->join('donvi', 'congviec.dv_id', '=', 'donvi.dv_id')
            ->join('nhanvien', 'nhanvien.nv_id', '=', 'congviec.nv_id')
            ->select('nhanvien.nv_ten', 'donvi.dv_id', 'donvi.dv_id_dvtruong', 'nhanvien.nv_id')
            ->whereColumn('donvi.dv_id_dvtruong', '=', 'nhanvien.nv_id');
    }

    public function scopeBangDv1($query)
    {
        return $query
            ->join('donvi', 'congviec.dv_id', '=', 'donvi.dv_id')
            ->join('nhanvien', 'nhanvien.nv_id', '=', 'congviec.nv_id')
            ->select('donvi.dv_ten', 'congviec.cv_trangthai', 'congviec.cv_hanhoanthanh',);
    }

    public function scopeSoGioLamTheoDv($query, $thang)
    {
        $congviecvagio = $query
            ->join('donvi', 'congviec.dv_id', '=', 'donvi.dv_id')

            ->select('donvi.dv_ten', 'congviec.cv_tgthuchien')
            ->where('congviec.cv_trangthai', '>', 1)
            ->where('congviec.cv_trangthai', '<', 5)
            ->whereMonth('CV_THGIANBATDAU', '<=', $thang)
            ->where(function ($query) use ($thang) {
                $query->whereNull('congviec.cv_thgianhoanthanh')
                    ->whereMonth('congviec.cv_hanhoanthanh', '>=', $thang)
                    ->orWhere(function ($query) use ($thang) {
                        $query->whereNotNull('congviec.cv_thgianhoanthanh')
                            ->whereMonth('congviec.cv_thgianhoanthanh', '>=', $thang);
                    });
            })
            ->get();
        $data = [];

        foreach ($congviecvagio as $row) {
            if (!isset($data[$row->dv_ten])) {
                $data[$row->dv_ten] = [
                    'total_gio_lam' => 0,
                    'total_bao_cao' => 0,
                ];
            }
            $data[$row->dv_ten]['total_gio_lam'] += $row->cv_tgthuchien;
            $data[$row->dv_ten]['total_bao_cao']++;
        }

        $tylelamviec = [];

        foreach ($data as $donVi => $info) {
            $tylelamviec[$donVi] = $info['total_gio_lam'] / $info['total_bao_cao'];
        }

        return $tylelamviec;
    }


    /********************************************************************************************************** */
}
