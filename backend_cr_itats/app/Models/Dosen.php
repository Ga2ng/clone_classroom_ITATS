<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;


class Dosen extends Model
{
    use HasFactory, HasApiTokens;


    public function matkuls()
    {
        return $this->hasMany(Matkul::class);
    }

}
