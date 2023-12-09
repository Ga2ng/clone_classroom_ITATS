<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tugas;
use Illuminate\Support\Facades\Storage;

class TugasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
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
        $tugas = new Tugas();
        $tugas->matkul_id = $request->matkul_id;
        $tugas->judul_tugas = $request->judul_tugas;
        $tugas->deadline = $request->deadline;
        $tugas->instruksi = $request->instruksi;

        if ($request->hasFile('materi')) {
            $image = $request->file('materi');
            $imagePath = $image->store('public');
            $tugas->materi = Storage::url($imagePath);
        }

        $tugas->save();

        return response()->json([
            'message' => 'Tugas berhasil disimpan',
            'tugas' => $tugas,
        ], 200);
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
    public function edit(Request $request)
    {
        $tugasId = $request->input('id');
        $tugas = Tugas::find($tugasId);

        if (!$tugas) {
            return response()->json(['message' => 'Tugas tidak ditemukan'], 404);
        }

        // Mengubah satu kolom sesuai dengan input dari permintaan (jika ada)
        if ($request->has('judul_tugas')) {
            $tugas->judul_tugas = $request->input('judul_tugas');
        }

        if ($request->has('deadline')) {
            $tugas->deadline = $request->input('deadline');
        }

        if ($request->hasFile('materi')) {
            $image = $request->file('materi');
            $imagePath = $image->store('public');
            $tugas->materi = Storage::url($imagePath);
        }

        $tugas->save();

        return response()->json([$tugas], 200);
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
        $tugasId = $request->input('id');
        $tugas = Tugas::find($tugasId);

        if (!$tugas) {
            return response()->json(['message' => 'Tugas tidak ditemukan'], 404);
        }

        $tugas->delete();

        return response()->json(['message' => 'Tugas berhasil dihapus'], 200);
    
    }

    public function getTugasById(Request $request)
    {
        // Mendapatkan nilai ID matkul dari permintaan
        $matkulId = $request->input('matkul_id');

        // Mencari semua tugas dengan ID matkul yang sama
        $tugas = Tugas::where('matkul_id', $matkulId)->get();

        return response()->json($tugas, 200);
    }
}
