<?php

use App\Http\Controllers\DosenController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\MatkulController;
use App\Http\Controllers\PresensiController;
use App\Http\Controllers\TugasController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/mahasiswa/login', [MahasiswaController::class, 'login']);
Route::post('/dosen/login', [DosenController::class, 'login']);

Route::get('mahasiswa', [MahasiswaController::class, 'index']);
Route::post('mahasiswa', [MahasiswaController::class, 'store']);

Route::post('/pilih_matkul', [MatkulController::class, 'pilihMatkul']);
Route::post('/get_matkul_by_id', [MatkulController::class, 'getMatkulById']);
Route::post('/get_matkul_dosen', [MatkulController::class, 'getMatkulDosen']);

Route::resource('dosen', DosenController::class);
Route::resource('matkul', MatkulController::class );

Route::post('/add_tugas', [TugasController::class, 'store' ]);
Route::post('/get_tugas', [TugasController::class, 'getTugasById' ]);
Route::post('/edit_tugas', [TugasController::class, 'edit' ]);
Route::post('/delete_tugas', [TugasController::class, 'destroy' ]);

Route::post('presensi', [PresensiController::class, 'store']);
Route::post('/get_status', [PresensiController::class, 'getStatusByMahasiswa']);
Route::post('/get_mahasiswa_presensi', [PresensiController::class, 'getPresensiMahasiswa']);
Route::post('/delete_presensi', [PresensiController::class, 'destroy']);
Route::post('/status_presensi', [PresensiController::class, 'hiddenStatus']);
Route::post('/get_hidden_status', [PresensiController::class, 'getHiddenStatus']);





