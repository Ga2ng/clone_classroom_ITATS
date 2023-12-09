<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            // Pengguna sudah login, lanjutkan permintaan
            return $next($request);
        }

        // Jika pengguna belum login, kembalikan respons tidak diizinkan
        return response()->json(['message' => 'Tidak diizinkan. Silakan login terlebih dahulu.'], 401);
    }
}
