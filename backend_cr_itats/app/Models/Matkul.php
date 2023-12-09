<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Matkul extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_matkul', 'jam_pelajaran', 'hari', 'kelas', 'foto_sampul', 'kode_kelas'
    ];

    public function dosen()
    {
        return $this->hasOne(Dosen::class);
        
    }

    public function mahasiswas()
    {
    return $this->belongsToMany(Mahasiswa::class, 'mahasiswa_matkul', 'matkul_id', 'mahasiswa_id');
    }

}
