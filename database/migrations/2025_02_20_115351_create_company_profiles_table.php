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
        Schema::create('company_profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->string('name');
            $table->string('industry');
            $table->string('website');
            $table->string('phone');
            $table->string('email');
            $table->text('address');
            $table->string('country');
            $table->string('city');
            $table->string('logo')->nullable();
            $table->string('cover_image')->nullable();
            $table->text('about');
            $table->year('founded_year');
            $table->enum('company_size', ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']);
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_profiles');
    }
};
