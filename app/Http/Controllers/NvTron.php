<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;
use Illuminate\Support\Carbon;

class NvTron extends Controller
{
        public function tron(Request $request)
        {
                $id = 1;
                $thang = request()->input('thang');
                if ($id && $thang) {
                        //$month = $thang->format('m');
                        $th = ltrim($thang, '0');



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






                        $TCV = ["name" => "TongCv", "value" => "$TongCv"];
                        $TCVCHT = ["name" => "TongCvChuaHT", "value" => "$TongCvChuaHoanThanh", "tile" => "$TLCHT%"];
                        $TCVCHTQH = ["name" => "TongCvChuaHTQH", "value" => "$TongCvChuaHoanThanhQH", "tile" => "$TLCHTQH%"];
                        $TCVHT = ["name" => "TongCvHT", "value" => "$TongCvHoanThanh", "tile" => "$TLHT%"];
                        $TCVHTQH = ["name" => "TongCvHTQH", "value" => "$TongCvHoanThanhQuaHan", "tile" => "$TLHTQH%"];
                        $tha = ["name" => "thang", "month" => "$th"];



                        return response()->json([$TCV, $TCVCHT, $TCVCHTQH, $TCVHT, $TCVHTQH, $tha]);
                }


                if ($id) {
                        $thang = Carbon::now();
                        $month = $thang->format('m');
                        $th = ltrim($month, '0');

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
                        $TLHT = round((($TongCvHoanThanh / $TotalHT) * 100), 0);
                        $TLHTQH = round((($TongCvHoanThanhQuaHan / $TotalHT) * 100), 0);
                        $TLCHT = round((($TongCvChuaHoanThanh / $TotalCHT) * 100), 0);
                        $TLCHTQH = round((($TongCvChuaHoanThanhQH / $TotalCHT) * 100), 0);






                        $TCV = ["name" => "TongCv", "value" => "$TongCv"];
                        $TCVCHT = ["name" => "TongCvChuaHT", "value" => "$TongCvChuaHoanThanh", "tile" => "$TLCHT%"];
                        $TCVCHTQH = ["name" => "TongCvChuaHTQH", "value" => "$TongCvChuaHoanThanhQH", "tile" => "$TLCHTQH%"];
                        $TCVHT = ["name" => "TongCvHT", "value" => "$TongCvHoanThanh", "tile" => "$TLHT%"];
                        $TCVHTQH = ["name" => "TongCvHTQH", "value" => "$TongCvHoanThanhQuaHan", "tile" => "$TLHTQH%"];
                        $tha = ["name" => "thang", "month" => "$th"];



                        return response()->json([$TCV, $TCVCHT, $TCVCHTQH, $TCVHT, $TCVHTQH, $tha]);
                }
        }
}
