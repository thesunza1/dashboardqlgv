<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaoCaoHangNgay;
use Illuminate\Support\Facades\Redirect;
use App\Models\CongViec;

class NvBang extends Controller
{
    public function bang(Request $request)
    {
        //
        $id = 1;
        //$user1=auth()->user();
        //$id=$user1->nv_id;

        $thang = $request->input('thang');

        if ($id && $thang) {
            $cvChaThang = CongViec::CvChaThang($id, $thang)->get();
            $cvCon = CongViec::CvCon($id, $thang)->get();
            foreach ($cvChaThang as $cvcha) {
                $cvcha->congViecCon = collect([]);
            }
            // Duyệt mảng công việc con
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
            // Trả về mảng công việc cha đã được thêm danh sách công việc con vào
            return $cvChaThang;
        }
        if ($id) {
            $thang = date('m');
            $cvChaThang = CongViec::CvChaThang($id, $thang)->get();
            $cvCon = CongViec::CvCon($id, $thang)->get();
            $cvChaThang[] = 'congViecCon[]';

            // Duyệt mảng công việc con
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

            // Trả về mảng công việc cha đã được thêm danh sách công việc con vào
            return response()->json($cvChaThang);
        }
    }
}
