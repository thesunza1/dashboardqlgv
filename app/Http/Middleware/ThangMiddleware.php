<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ThangMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     *      * @param  int  $thang
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $thang = $request->input('thang') ?? date('m');
        $request->merge(['thang' => $thang]);

        return $next($request);
    }}
