<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::table('appointments', function (Blueprint $table) {
        if (!Schema::hasColumn('appointments', 'patient_id')) {
            $table->foreignId('patient_id')->constrained('users');
        }
    });
}

public function down()
{
    Schema::table('appointments', function (Blueprint $table) {
        $table->dropForeign(['patient_id']);
        $table->dropColumn('patient_id');
    });
}
};