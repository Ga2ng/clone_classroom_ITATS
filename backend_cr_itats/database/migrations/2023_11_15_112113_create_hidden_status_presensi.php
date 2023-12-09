<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('hidden_status', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('matkul_id');
            $table->unsignedInteger('minggu');
            $table->boolean('status')->default(false);
            $table->timestamps();

            $table->foreign('matkul_id')->references('id')->on('matkuls');
        });
    }

    public function down()
    {
        Schema::dropIfExists('hidden_status');
    }
};
