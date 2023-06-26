<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;
use Illuminate\Support\Carbon;


class LdTron extends Controller
{
    public function tron(Request $request)
    {

        $thang = $request->input('thang');

        if ($thang) {
            //$month = $thang->format('m');
            $th = ltrim($thang, '0');

            $TongCvTHT = CongViec::CongViecHoanThanhDv($thang);
            $TongCvTCHT = CongViec::CongViecChuaHoanThanhDv($thang);
            $TongCvTDL = CongViec::CongViecDangLamDv($thang);
            $total = $TongCvTHT + $TongCvTCHT + $TongCvTDL;
            $TLHT = round((($TongCvTHT / $total) * 100), 0);
            $TLCHT = round((($TongCvTCHT / $total) * 100), 0);
            $TLQH = round((($TongCvTDL / $total) * 100), 0);
            $tileHT = ["name" => "tileHT", "value" => "$TLHT%"];
            $tileCHT = ["name" => "tileCHT", "value" => "$TLCHT%"];
            $tileQH = ["name" => "tileQH", "value" => "$TLQH%"];
            $TCVHT = ["name" => "TongCvHT", "value" => "$TongCvTHT", "tile" => "$TLHT%"];
            $TCVCHT = ["name" => "TongCVCHT", "value" => "$TongCvTCHT", "tile" => "$TLCHT%"];
            $TCVDL = ["name" => "TongCvDL", "value" => "$TongCvTDL", "tile" => "$TLQH%"];
            $tha = ["name" => "thang", "month" => $th];


            return response()->json([$TCVHT, $TCVCHT, $TCVDL, $tha]);
        }
        if (!$thang) {
            $thang = Carbon::now();
            $month = $thang->format('m');
            $th = ltrim($month, '0');

            $TongCvTHT = CongViec::CongViecHoanThanhDv($thang);
            $TongCvTCHT = CongViec::CongViecChuaHoanThanhDv($thang);
            $TongCvTDL = CongViec::CongViecDangLamDv($thang);


            $TCVHT = ["name" => "TongCvHT", "value" => "$TongCvTHT"];
            $TCVCHT = ["name" => "TongCVCHT", "value" => "$TongCvTCHT"];
            $TCVDL = ["name" => "TongCvDL", "value" => "$TongCvTDL"];
            $tha = ["name" => "thang", "month" => $th];
            $total = $TongCvTHT + $TongCvTCHT + $TongCvTDL;
            $TLHT = round((($TongCvTHT / $total) * 100), 0);
            $TLCHT = round((($TongCvTCHT / $total) * 100), 0);
            $TLQH = round((($TongCvTDL / $total) * 100), 0);
            $tileHT = ["name" => "tileHT", "value" => "$TLHT%"];
            $tileCHT = ["name" => "tileCHT", "value" => "$TLCHT%"];
            $tileQH = ["name" => "tileQH", "value" => "$TLQH%"];
            $TCVHT = ["name" => "TongCvHT", "value" => "$TongCvTHT", "tile" => "$TLHT%"];
            $TCVCHT = ["name" => "TongCVCHT", "value" => "$TongCvTCHT", "tile" => "$TLCHT%"];
            $TCVDL = ["name" => "TongCvDL", "value" => "$TongCvTDL", "tile" => "$TLQH%"];
            $tha = ["name" => "thang", "month" => $th];

            return response()->json([$TCVHT, $TCVCHT, $TCVDL, $tileHT, $tileCHT, $tileQH, $tha]);
        }
    }
}
