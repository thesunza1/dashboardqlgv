<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //


        /*      // Thiết lập root URL
            URL::forceRootUrl(config('app.url'));
            URL::forceScheme('http');
    
            // Thiết lập các defaults cho URL
            URL::defaults([
                'api' => 'api',
                'middleware' => 'api',
                'prefix' => 'dashboardqlcv',
            ]);
    
            // Định nghĩa route cho tài nguyên nhanvien
            Route::prefix('dashboardqlcv')->group(function () {
                route::get('/nhanvien', [NhanVienController::class, 'index']);
            });
            */
    }



    /*public function boot()
    {
        URL::forceRootUrl(config('app.url'));
        URL::forceScheme('https');
    
        URL::defaults([
            'api' => 'api',
            'middleware' => 'api',
            'prefix' => 'dashboardqlcv',
        ]);
    }*/
}
