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
        Schema::create('applications', function (Blueprint $table) {
            $table->uuid('id');
            $table->uuid('user_id');
            $table->uuid('job_id');
            $table->text('cover_letter');
            $table->enum('status', ['pending', 'reviewed', 'accepted', 'rejected'])->default('pending');
            $table->text('comments')->nullable();
            $table->timestamp('applied_at')->useCurrent();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
