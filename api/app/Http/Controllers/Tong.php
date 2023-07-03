<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;
use App\Models\NhanVien;
use App\Models\DonVi;
use Illuminate\Support\Carbon;

class Tong extends Controller
{
    public function head(Request $request)
    {
        $id = 1;
        //$user1=auth()->user();
        //$id=$user1->nv_id;
        $tt = NhanVien::ThongTinNhanVien($id);
        $donvi = DonVi::select('dv_id', 'dv_ten', 'dv_id_dvtruong')->get();
        $resultten = array();
        foreach ($donvi as $value) {
            // Khởi tạo các biến
            $quyen = "";
            foreach ($tt as $nv) {
                $tenNv = $nv->nv_ten;
                if ($nv->quyen == "nv") {
                    if ($value->dv_id_dvtruong == $nv->nv_id) {
                        $quyen = "Trưởng Phòng";
                    } else $quyen = "NhanVien";
                }
                if ($nv->nv_quyen = "ld") {
                    $quyen = "Lãnh Đạo";
                }
            }
            $resultten[] = array(
                'TenNv' => $tenNv,
                'ChucVu' => $quyen
            );
        }
        $resultten = array_map("unserialize", array_unique(array_map("serialize", $resultten)));
        return $resultten;
    }
    public function nhanvien(Request $request)
    {
        $id = 1;
        //$user1=auth()->user();
        //$id=$user1->nv_id;


        $nam = date('y');



        $responseData = [];
        $months = ['', 'Thang_1', 'Thang_2', 'Thang_3', 'Thang_4', 'Thang_5', 'Thang_6', 'Thang_7', 'Thang_8', 'Thang_9', 'Thang_10', 'Thang_11', 'Thang_12'];

        for ($i = 1; $i <= 12; $i++) {


            $thang = $i;

            $cvChaThang = CongViec::CvChaThang($id, $thang)->get();
            $cvCon = CongViec::CvCon($id, $thang)->get();

            $th = ltrim($thang, '0');
            $hientai = date('Y-m-t', mktime(0, 0, 0, $thang + 1, 0, $nam));

            $ngay = date('Y-m-d', strtotime('+3 days', strtotime($hientai))); // Trừ đi 3 ngày
            // Duyệt mảng công việc con
            foreach ($cvChaThang as $cvcha) {
                $cvcha->congViecCon = collect([]);
            }
            foreach ($cvCon as $con) {
                // Tìm công việc cha tương ứng bằng cách so sánh cv_cv_cha và cv_id
                $cha = $cvChaThang->where('cv_id', $con->cv_id)->first();

                // Nếu công việc cha được tìm thấy, thêm công việc con vào mảng công việc con của công việc cha
                if ($cha) {
                    if (!isset($cha->congViecCon)) {
                        $cha->congViecCon = collect([$con]);
                    } else {
                        $cha->congViecCon->push($con);
                    }
                }
            }

            $GioTheoNgay = BaoCaoHangNgay::SoGioLamNgay($id, $thang);
            $TongGioLamNgay = BaoCaoHangNgay::TongSoGioLamNgay($id, $thang);

            $Tong = ["name" => "tong_gio", "value" => "$TongGioLamNgay"];
            $GioTheoNgay[] = $Tong;
            $tha = ["name" => "thang", "month" => "$th"];
            $GioTheoNgay[] = $tha;




            $TongGioLam = BaoCaoHangNgay::SoGioLam($id, $thang);


            //thời gian thực hiện công việc của tháng hiện tại
            $TongGioLam = BaoCaoHangNgay::SoGioLam($id, $thang);

            $GCv = CongViec::SoGioLamTheocvId($id, $thang);




            $Gio = ["name" => "TongGioLam", "value" => $TongGioLam];
            $tha = ["name" => "thang", "month" => "$th"];

            $GCv[] = $Gio;
            $GCv[] = $tha;


            //Tổng công việc cha trong tháng
            $TongCv = CongViec::countCvChaThang($id, $thang);

            //tổng công việc hoàn thành
            $TongCvHoanThanh = CongViec::CongViecHoanThanh($id, $thang);

            //tổng công việc hoàn thành qúa hạn
            $TongCvHoanThanhQuaHan = CongViec::CongViecHoanThanhQuaHan($id, $thang);

            //tổng công việc chưa hoàn thành 
            $TongCvChuaHoanThanh = CongViec::CongViecChuaHoanThanh($id, $thang);

            //tổng công việc chưa hoàn thành quá hạn
            $TongCvChuaHoanThanhQH = CongViec::CongViecChuaHoanThanhQH($id, $thang);

            $TotalHT = $TongCvHoanThanh + $TongCvHoanThanhQuaHan;
            $TotalCHT = $TongCvChuaHoanThanh + $TongCvChuaHoanThanhQH;
            if ($TotalHT != 0) {
                $TLHT = round((($TongCvHoanThanh / $TotalHT) * 100), 0);
                $TLHTQH = round((($TongCvHoanThanhQuaHan / $TotalHT) * 100), 0);
            }
            if ($TotalHT == 0) {
                $TLHT = 0;
                $TLHTQH = 0;
            }
            if ($TotalCHT != 0) {
                $TLCHT = round((($TongCvChuaHoanThanh / $TotalCHT) * 100), 0);
                $TLCHTQH = round((($TongCvChuaHoanThanhQH / $TotalCHT) * 100), 0);
            }
            if ($TotalCHT == 0) {
                $TLCHT = 0;
                $TLCHTQH = 0;
            }

            $CongViecVaGio = BaoCaoHangNgay::SoGioLamTheoLcvId($id, $thang);
            $thangh = ["name" => "thang", "month" => $thang];
            $CongViecVaGio[] = $thangh;




            $TCV = ["name" => "TongCv", "value" => "$TongCv"];
            $TCVCHT = ["name" => "TongCvChuaHT", "value" => "$TongCvChuaHoanThanh", "tile" => "$TLCHT%"];
            $TCVCHTQH = ["name" => "TongCvChuaHTQH", "value" => "$TongCvChuaHoanThanhQH", "tile" => "$TLCHTQH%"];
            $TCVHT = ["name" => "TongCvHT", "value" => "$TongCvHoanThanh", "tile" => "$TLHT%"];
            $TCVHTQH = ["name" => "TongCvHTQH", "value" => "$TongCvHoanThanhQuaHan", "tile" => "$TLHTQH%"];
            $tha = ["name" => "thang", "month" => "$th"];
            $NvTron = [$TCV, $TCVCHT, $TCVCHTQH, $TCVHT, $TCVHTQH, $tha];





            $monthData = [

                'NvBang' => $cvChaThang,

                'NvCot' => $GCv,
                'NvTron' => $NvTron,
                'NvCotTrai' => $CongViecVaGio,
                'NvCOtNgayLam' => $GioTheoNgay

            ];
            $months[$i] = ["name" => $months[$i]];
            $responseData[$months[$i]][] =  $monthData;
        }
        return response()->json($responseData);
    }


    public function lanhdao(Request $request)
    {
        $id = 1;
        //$user1=auth()->user();
        //$id=$user1->nv_id;

        //$thang = $request->input('thang');
        $nam = date('y');

        //$th = ltrim($thang, '0');

        $responseData = [];
        $months = ['', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

        for ($i = 1; $i <= 12; $i++) {
            $thang = $i;

            $th = ltrim($thang, '0');
            $hientai = date('Y-m-t', mktime(0, 0, 0, $thang + 1, 0, $nam));

            $ngay = date('Y-m-d', strtotime('+3 days', strtotime($hientai))); // Trừ đi 3 ngày
            $TongCvTHT = CongViec::CongViecHoanThanhDv($thang);
            $TongCvTCHT = CongViec::CongViecChuaHoanThanhDv($thang);
            $TongCvTDL = CongViec::CongViecDangLamDv($thang);
            $total = $TongCvTHT + $TongCvTCHT + $TongCvTDL;
            if ($total != 0) {
                $TLHT = round((($TongCvTHT / $total) * 100), 0);
                $TLCHT = round((($TongCvTCHT / $total) * 100), 0);
                $TLQH = round((($TongCvTDL / $total) * 100), 0);
            }
            if ($total == 0) {
                $TLHT = 0;
                $TLCHT = 0;
                $TLQH = 0;
            }


            $tileHT = ["name" => "tileHT", "value" => "$TLHT%"];
            $tileCHT = ["name" => "tileCHT", "value" => "$TLCHT%"];
            $tileQH = ["name" => "tileQH", "value" => "$TLQH%"];
            $TCVHT = ["name" => "TongCvHT", "value" => "$TongCvTHT", "tile" => "$TLHT%"];
            $TCVCHT = ["name" => "TongCVCHT", "value" => "$TongCvTCHT", "tile" => "$TLCHT%"];
            $TCVDL = ["name" => "TongCvDL", "value" => "$TongCvTDL", "tile" => "$TLQH%"];
            $tha = ["name" => "thang", "month" => $th];
            $LdTron = [$TCVHT, $TCVCHT, $TCVDL, $tha];



            $BieuDoCot = NhanVien::SoGioLamTheoDv($thang);
            $ten1 = [];

            foreach ($BieuDoCot as $donVi => $tyLe) {
                $gia_fm = number_format($tyLe, 2, '.', ',');
                $gia_num = floatval(str_replace(',', '', $gia_fm));
                $ten1[] = ["name" => "$donVi", "value" => "$gia_num"];
            }
            $tha = ["name" => "thang", "month" => "$th"];
            $ten1[] = $tha;

            $donvi = DonVi::select('dv_id', 'dv_ten')->get();
            $congviec = CongViec::CvDvT($thang)->get();
            $congviecs = CongViec::BangConDv($thang)->get();
            $TruongPhong = NhanVien::BangDv()->get();

            //return $TruongPhong;


            $result = array();
            foreach ($donvi as $value) {
                // Khởi tạo các biến
                $tongcv = 0;
                $sapdenhan = 0;
                $hethan = 0;
                $tongcv = 0;
                $ten = "";
                // Lặp qua các công việc
                foreach ($congviec as $cv) {

                    if ($cv->dv_id == $value->dv_id) {

                        if ($cv->cv_trangthai > 1) { // Đang thực hiện
                            $tongcv++; // Tăng tổng công việc lên 1
                        }
                        if ($cv->cv_hanhoanthanh >= $hientai && $cv->cv_hanhoanthanh <= $ngay) { // Sắp đến hạn hoàn thành
                            $sapdenhan++; // Tăng số lượng công việc sắp hết hạn lên 1
                        }
                        if (4 == $cv->cv_trangthai) { // Hết hạn hoàn thành
                            $hethan++; // Tăng số lượng công việc đã hết hạn hoàn thành lên 1
                        }
                    }
                }
                foreach ($TruongPhong as $Tp) {
                    if ($Tp->dv_id == $value->dv_id) {
                        $ten = $Tp->nv_ten;
                    }
                }

                // Kiểm tra nếu dv_id đã có trong mảng $result thì thêm công việc mới vào mảng CvCon
                $CvConArray = array(); // Khởi tạo mảng chứa các mảng CvCon
                foreach ($congviecs as $key => $valueCv) { // Duyệt qua từng phần tử của mảng CvCon
                    if ($valueCv->dv_id == $value->dv_id) { // Kiểm tra nếu dv_id giống nhau
                        $CvConArray[] = $valueCv; // Thêm mảng CvCon tương ứng vào mảng $CvConArray
                    }
                }
                if ($tongcv != 0) {
                    $total = $sapdenhan + $hethan;
                    $tile = ($tongcv - $total) / $tongcv * 100;
                }
                if ($tongcv == 0) {

                    $tile = 0;
                }
                // Thêm mới một phần tử vào mảng $result
                $result[] = array(
                    'dv_id' => $value->dv_id,
                    'dv_ten' => $value->dv_ten,
                    'tongcv' => $tongcv,
                    'sapdenhan' => $sapdenhan,
                    'hethan' => $hethan,
                    'tile' => $tile,
                    'tentruongphong' => $ten,
                    'CvCon' => $CvConArray,

                );
            }
            $monthData = [


                'LdTron' => $LdTron,


                'LdCot' => $ten1,
                'LdBang' => $result
            ];
            $responseData[$months[$i]][] =  $monthData;
        }
        return response()->json($responseData);
    }
}
