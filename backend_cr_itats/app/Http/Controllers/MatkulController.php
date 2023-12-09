<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use App\Models\Matkul;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;


class MatkulController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $matkuls = Matkul::all();

        $matkulData = $matkuls->map(function ($item) {
            return [
                'id' => $item->id,
                'data' => $item->toArray(),
                // 'dosen' => $item->dosen->nama,
                // 'foto_path' => $this->ambilFotoSampul($item->foto_sampul), // Mengambil foto sampul
            ];
        });

        return response()->json($matkulData);
    }

    public function ambilFotoSampul($nama)
    {
        $pathLengkap = 'public/' . $nama; // Sesuaikan path dengan direktori 'storage/app/public'

        if (Storage::disk('local')->exists($pathLengkap)) {
            return Storage::disk('local')->url($pathLengkap);
        }

        return null; // Atau respons lain sesuai kebutuhan Anda jika gambar tidak ditemukan
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


        $matkul = new Matkul;
        $matkul->nama_matkul = $request['nama_matkul'];
        $matkul->jam_pelajaran = $request['jam_pelajaran'];
        $matkul->hari = $request['hari'];
        $matkul->kelas = $request['kelas'];
        $matkul->kode_kelas = $request['kode_kelas'];
        $matkul->dosen_id = $request['dosen_id'];
        $matkul->nama_dosen = $request['nama_dosen'];

        // Simpan ID dosen yang mengajar matkul ini

        if ($request->hasFile('foto_sampul')) {
            $image = $request->file('foto_sampul');
            $imagePath = $image->store('public');
            $matkul->foto_sampul = Storage::url($imagePath);
        }

        $matkul->save();


        $matkulData = $matkul->toArray();

        return response()->json([
            'message' => 'Matkul berhasil disimpan.',
            'data' => $matkulData,
        ], 201);
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
    public function destroy(string $id)
    {
        //
    }

    public function pilihMatkul(Request $request)
    {

        $mahasiswa_id = $request->input('mahasiswa_id');
        $matkul_id = $request->input('matkul_id');

            $existingRecord = DB::table('mahasiswa_matkul')
        ->where('mahasiswa_id', $mahasiswa_id)
        ->where('matkul_id', $matkul_id)
        ->first();

        if ($existingRecord) {
            return response()->json([
                'error' => 'Mahasiswa sudah mengambil mata kuliah ini sebelumnya.',
            ],400); // Gunakan kode status 400 (Bad Request) atau kode yang sesuai
        }

        // Jika mahasiswa belum mengambil mata kuliah ini, simpan data
        DB::table('mahasiswa_matkul')->insert([
            'mahasiswa_id' => $mahasiswa_id,
            'matkul_id' => $matkul_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $data = DB::table('mahasiswa_matkul')
            ->where('mahasiswa_id', $mahasiswa_id)
            ->where('matkul_id', $matkul_id)
            ->first();

        return response()->json([
            'message' => 'Matkul berhasil disimpan.',
            'data' => $data,
        ], 201);
    }

    public function getMatkulById(Request $request)
    {

        $mahasiswa_id = $request->input('mahasiswa_id');
    
        $matkul = DB::table('mahasiswa_matkul')
            ->where('mahasiswa_id', $mahasiswa_id)
            ->join('matkuls', 'mahasiswa_matkul.matkul_id', '=', 'matkuls.id')
            ->select(
                'matkuls.id',
                'matkuls.nama_matkul as nama_matkul',
                'matkuls.jam_pelajaran as jam_pelajaran',
                'matkuls.hari as hari',
                'matkuls.kelas as kelas',
                'matkuls.kelas as kelas',
                'matkuls.foto_sampul as foto_sampul',
                'matkuls.kode_kelas as kode_kelas',
                // 'matkuls.dosen_id as dosen_id',
                'matkuls.nama_dosen as nama_dosen',
                ) // Memilih kolom ID dan nama mata kuliah
            ->get();
    
        if ($matkul->isEmpty()) {
            return response()->json(['message' => 'Mahasiswa belum mengambil mata kuliah.'], 200);
        }

        $matkulArray = $matkul->toArray();
    
        return response()->json($matkulArray);

    }

    public function getMatkulDosen(Request $request) {
        $dosenId = $request->input('dosen_id');
    
        $matkuls = DB::table('matkuls')->where('dosen_id', $dosenId)->get();
    
        if ($matkuls->isEmpty()) {
            return response()->json(['message' => 'Tidak ada mata kuliah untuk dosen ini.'], 404);
        }
    
        return response()->json($matkuls);
    }
}
