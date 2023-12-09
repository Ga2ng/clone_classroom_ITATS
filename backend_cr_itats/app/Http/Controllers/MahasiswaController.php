<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mahasiswa;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    $mahasiswa = Mahasiswa::all();

    // Membuat array baru yang memisahkan ID dan data
    $mahasiswaData = $mahasiswa->map(function ($item) {
        return [
            'id' => $item->id,
            'data' => $item->toArray(),
        ];
    });

    return response()->json($mahasiswaData);
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
        $mahasiswa = new Mahasiswa();
        $mahasiswa->nama = $request['nama'];
        $mahasiswa->nim = $request['nim'];
        $mahasiswa->email = $request['email'];
        $mahasiswa->password = bcrypt($request['password']);
        $mahasiswa->save();
    
        return response()->json(['message' => 'Registration successful'], 201);
        // return response()->json($mahasiswa);
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
        
    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
    
        $user = Mahasiswa::where('email', $email)->first();
    
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
                'nim' => $user->nim,
                'nama' => $user->nama,
                // Tambahkan data pengguna lainnya jika perlu
            ];

            $token = $user->createToken('Token', ['nim' => $user->nim, 'nama' => $user->nama])->plainTextToken;
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
