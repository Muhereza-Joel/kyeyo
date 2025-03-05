<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\CompanyProfile;
use App\Models\Job;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class DashboardController extends Controller
{
    public function renderDashboard()
    {
        $users = User::count();
        $jobs = Job::count();
        $applications = Application::count();
        $companies = CompanyProfile::count();

        $images = Media::where('collection_name', 'profile_images') // Optionally filter by collection
            ->get();

        // If you want the URLs of the media items:
        $imageUrls = $images->map(function ($media) {
            return $media->getUrl(); // Get URL of each media
        });

        return Inertia::render(
            'Dashboard',
            [
                'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
                'jobs' => $jobs,
                'users' => $users,
                'applications' => $applications,
                'companies' => $companies,
                'images' => $imageUrls
            ]
        );
    }
}
