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
    route::get('/nhanvien', [NhanVienController::class, 'index']);
    route::get('/nvbang', [NvBang::class, 'bang']);
    route::get('/nvtron', [NvTron::class, 'tron']);
    route::get('/nvcot', [NvCot::class, 'cot']);
    Route::get('/ldcot', [LanhdaoController::class, 'lanhdao']);
    Route::get('/ldtron', [LdTron::class, 'tron']);
    Route::get('/ldbang', [LdCot::class, 'cot']);
    
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });
});

    
Route::get('/head', function (Request $request) {
    $thang = '10';
    $request = request()->merge(['thang' => $thang]);

    return response()->json(['message' => 'OK']);

})->middleware(['thang']);


    