<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\Dosen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class DosenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    $dosen = Dosen::all();

    // Membuat array baru yang memisahkan ID dan data
    $dosenData = $dosen->map(function ($item) {
        return [
            'id' => $item->id,
            'data' => $item->toArray(),
        ];
    });

    return response()->json($dosenData);
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

        $dosen = new Dosen();
        $dosen->nama = $request['nama'];
        $dosen->email = $request['email'];
        $dosen->password = bcrypt($request['password']);
        $dosen->save();

        $dosenData = $dosen->toArray();

        return response()->json([
            'message' => 'Registrasi Dosen berhasil',
            'data' => $dosenData,
        ]);
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
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
    
        $user = Dosen::where('email', $email)->first();
    
        if (!$user) {
            // Pengguna dengan email yang diberikan tidak ditemukan
            return response()->json(['message' => 'Login gagal'], 401);
        }
    
        if (Hash::check($password, $user->password)) {
            // Kata sandi cocok
            // Lakukan login pengguna di sini jika perlu

            $userData = [
                'id' => $user->id,
                'email' => $user->email,
                'nama' => $user->nama,
                // Tambahkan data pengguna lainnya jika perlu
            ];

            $token = $user->createToken('Token', ['nama' => $user->nama])->plainTextToken;
            return response()->json([
                'message' => 'Login sukses', 
                'access_token' => $token,
                'user' => $userData,
            ], 200);

        } else {
            // Kata sandi tidak cocok
            return response()->json(['message' => 'Login gagal'], 401);
        }
    }
}
