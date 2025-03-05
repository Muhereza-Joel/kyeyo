<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->uuid('profession_id')->after('title');
            $table->uuid('industry_id')->after('profession_id');
            $table->uuid('seniority_id')->after('industry_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropColumn('seniority_id');
            $table->dropColumn('industry_id');
            $table->dropColumn('profession_id');
        });
    }
};
