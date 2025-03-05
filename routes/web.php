<?php

use App\Http\Controllers\ApplicationsController;
use App\Http\Controllers\CompanyProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExperienceLevelController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Tags\Tag;

Route::get('/', function () {
    return redirect("/login");
});

Route::get('/dashboard', [DashboardController::class, 'renderDashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('/users', UsersController::class);
    Route::get('/user/profile/create', [ProfileController::class, 'renderUserProfile'])->name('edit-user-profile');
    Route::post('/profile/bio', [ProfileController::class, 'updateBioData'])->name('updateBioData');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/assign/permissions', [RoleController::class, 'assignPermissions'])->name('assign-permissions');
    Route::post('/roles/{role}/permissions', [RoleController::class, 'updatePermissions'])->name('roles.save-assigned-permissions');
    Route::resource('/roles', RoleController::class)->middleware('role:root');
    Route::resource('/permissions', PermissionController::class)->middleware('role:root');

    Route::resource('/jobs', JobsController::class);
    Route::get('/tags', function (Request $request) {
        return response()->json(Tag::all()->pluck('name'));
    });
    Route::patch('/jobs/{id}/toggle', [JobsController::class, 'toggle'])->name('jobs.toggle');
    Route::resource('/category', TagsController::class);
    Route::get('jobs/tagged/{slug}', [TagsController::class, 'showJobsTagged'])->name('jobs-tagged');
    Route::resource('/categories', IndustryController::class);
    Route::resource('/professions', ProfessionController::class);
    Route::resource('/seniority', ExperienceLevelController::class);
    Route::resource('/company-profile', CompanyProfileController::class);
    Route::get('/jobs/{id}/applications/create', [ApplicationsController::class, 'apply'])->name('create-application');
    Route::resource('/applications', ApplicationsController::class);
    Route::get('/search/jobs', [JobsController::class, 'search'])->name('jobs.search');
});

require __DIR__ . '/auth.php';
