<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Admin\logincontroller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NhanVienController;
use App\Http\Middleware\ThangMiddleware;
use Closure;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('dashboardqlcv')->middleware('thang')->group(function () {

    Route::get('/NV', [NVcontroller::class, 'NV']);
    Route::get('/', [logincontroller::class, 'getlogin']);
    Route::post('/', [logincontroller::class, 'postlogin']);
    route::get('/cotloai', [NhanVienController::class, 'index']);
    route::get('/nvbang', [NvBang::class, 'bang']);
    route::get('/nvtron', [NvTron::class, 'tron']);
    route::get('/nvcot', [NvCot::class, 'cot']);
    Route::get('/ldcot', [LanhdaoController::class, 'lanhdao']);
    Route::get('/ldtron', [LdTron::class, 'tron']);
    Route::get('/ldbang', [LdCot::class, 'cot']);
    Route::get('/nhanvien', [Tong::class, 'nhanvien']);
    Route::get('/lanhdao', [Tong::class, 'lanhdao']);
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });
});


Route::middleware('thang')->get('/example', function (Request $request, Closure $next) {
    $thang = 4; //$request->input('thang') ?? date('m');
    $request->merge(['thang' => $thang]);

    return $next($request);
});
