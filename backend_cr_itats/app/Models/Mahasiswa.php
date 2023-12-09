<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Mahasiswa extends Model
{
    use HasFactory, HasApiTokens;

    public function matkuls()
    {
        return $this->belongsToMany(Matkul::class, 'mahasiswa_matkul', 'mahasiswa_id', 'matkul_id');
    }

}
