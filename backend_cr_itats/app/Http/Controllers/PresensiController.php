<?php

namespace App\Http\Controllers;

use App\Models\Presensi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PresensiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $presensi = DB::table('presensi')->insertGetId([
            'mahasiswa_id' => $request['mahasiswa_id'],
            'matkul_id' => $request['matkul_id'],
            'minggu' => $request['minggu'],
            'status' => $request['status'],
            'created_at' => now(), 
            'updated_at' => now(),
        ]);
    
        // Retrieve the inserted record
        $insertedData = DB::table('presensi')->find($presensi);
    
        return response()->json(['data' => $insertedData]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $matkulId = $request->input('matkul_id');
        $minggu = $request->input('minggu');

        $presensi = DB::table('presensi')
        ->where('minggu', $minggu)
        ->where('matkul_id', $matkulId)
        ->first();

        if($presensi){
            DB::table('presensi')
            ->where('minggu', $minggu)
            ->where('matkul_id', $matkulId)
            ->delete();

            return response()->json(['message' => 'Presensi berhasil dihapus'], 200);
        }else {
            return response()->json(['message' => 'Presensi tidak ditemukan'], 404);
        }


    }

    public function getStatusByMahasiswa(Request $request)
    {
        $matkulId = $request->input('matkul_id');
        $mahasiswaId = $request->input('mahasiswa_id');
        $statusByWeek = [];

        for ($minggu = 1; $minggu <= 16; $minggu++) {
            $status = DB::table('presensi')
                ->where('matkul_id', $matkulId)
                ->where('mahasiswa_id', $mahasiswaId)
                ->where('minggu', $minggu)
                ->select('status') // Menggunakan select untuk mendapatkan nilai status
                ->first(); // Menggunakan first() untuk mendapatkan satu baris hasil

            // Mengambil nilai status atau menggunakan nilai default 0 jika tidak ditemukan
            $statusByWeek[$minggu] = $status ? $status->status : 0;
        }

        return response()->json([$statusByWeek]);
    }

    public function getPresensiMahasiswa(Request $request)
    {
        // Validate the request if needed

        $matkulId = $request->input('matkul_id');
        $minggu = $request->input('minggu');

        // Query to retrieve data based on matkul_id and minggu
        $data = DB::table('presensi')
            ->join('mahasiswas', 'presensi.mahasiswa_id', '=', 'mahasiswas.id')
            ->where('presensi.matkul_id', $matkulId)
            ->where('presensi.minggu', $minggu)
            ->select('mahasiswas.id as idMahasiswa', 'mahasiswas.nama as namaMahasiswa')
            ->get();

            $data->toArray();

        // Check if data is found
        if ($data->isNotEmpty()) {
            return response()->json($data);
        } else {
            return response()->json(['message' => 'Data not found for the provided matkul_id and minggu'], 404);
        }
    }

    public function hiddenStatus(Request $request)
    {
        $minggu = $request->input('minggu');
        $matkulId = $request->input('matkul_id');
        $hiddenStatus = $request->input('status');
        // $hiddenStatusByWeek = [];

        $presensiId = DB::table('hidden_status')->updateOrInsert(
        [
            'minggu' => $minggu,
            'matkul_id' => $matkulId,
        ],
        [
            'status' => $hiddenStatus,
            // 'created_at' => now(), 
            'updated_at' => now(),
        ]);


        $presensi = DB::table('hidden_status')->find($presensiId);

        for ($minggu = 1; $minggu <= 16; $minggu++) {
            $status = DB::table('hidden_status')
                ->where('matkul_id', $matkulId) // Tambahkan kondisi untuk matkul_id
                ->where('minggu', $minggu)
                ->value('status');

            // Memastikan $status tidak null sebelum menyimpannya
            $hiddenStatusByWeek[$minggu] = $status ?? 0;  
        }

        return response()->json([
            'presensi' => $presensi, 
            'all_hidden_status' => $hiddenStatusByWeek
        ]);

    }
    public function getHiddenStatus (Request $request)
    {
        $matkulId = $request->input('matkul_id');
        // Menginisialisasi $hiddenStatus sebagai array kosong
        $hiddenStatus = [];
    
        for ($minggu = 1; $minggu <= 16; $minggu++) {
            $status = DB::table('hidden_status')
                ->where('matkul_id', $matkulId)
                ->where('minggu', $minggu)
                ->value('status');
    
            // Memastikan $status tidak null sebelum menyimpannya
            $hiddenStatus[$minggu] = $status ?? 0;
        }
    
        return response()->json([$hiddenStatus]);
    }
}
