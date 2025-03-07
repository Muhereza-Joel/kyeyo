<?php

namespace App\Http\Controllers;

use App\Models\ExperienceLevel;
use App\Models\Industry;
use App\Models\Job;
use App\Models\Profession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Tags\Tag;

class TagsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function showJobsTagged(Request $request, string $slug)
    {
        $tag = Tag::whereRaw("BINARY json_unquote(json_extract(slug, '$.\"en\"')) = ?", [$slug])->firstOrFail();
        $seniorities = ExperienceLevel::pluck('name');
        $industries = Industry::pluck('name');
        $professions = Profession::pluck('name');

        // Get all jobs associated with this tag
        $query = Job::with(['tags', 'companyProfile', 'profession', 'industry', 'seniority'])
            ->whereHas('tags', function ($query) use ($slug) {
                $query->where('slug->en', $slug);
            });

        // Handle published filter
        if ($request->filled('published')) {
            switch ($request->published) {
                case 'Last 1 Week':
                    $query->where('created_at', '>=', now()->subWeek());
                    break;
                case 'Last 30 Days':
                    $query->where('created_at', '>=', now()->subDays(30));
                    break;
                case 'Latest 24 Hours':
                    $query->where('created_at', '>=', now()->subDay());
                    break;
            }
        }

        if ($request->filled('seniority')) {
            $query->whereHas('seniority', function ($q) use ($request) {
                $q->where('name', $request->seniority);
            });
        }

        if ($request->filled('industry')) {
            $query->whereHas('industry', function ($q) use ($request) {
                $q->where('name', $request->industry);
            });
        }

        if ($request->filled('profession')) {
            $query->whereHas('profession', function ($q) use ($request) {
                $q->where('name', $request->profession);
            });
        }

        $jobs = $query->paginate(20);
        // Append logo URL for each job (assuming 'profile_images' is the media collection name)
        $jobs->transform(function ($job) {
            $job->logo = $job->companyProfile
                ? $job->companyProfile->getFirstMediaUrl('profile_images')
                : null;
            return $job;
        });

        // Fetch all tags and count jobs associated with each tag
        $tags = Tag::get()->map(function ($tag) {
            $tag->jobs_count = Job::whereHas('tags', function ($query) use ($tag) {
                $query->where('tags.id', $tag->id);
            })->count();
            return $tag;
        });

        return Inertia::render('Jobs', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'jobs' => $jobs,
            'tags' => $tags, // Now each tag has a 'jobs_count' field
            'currentTag' => $tag,
            'seniorities' => $seniorities,
            'industries' => $industries,
            'professions' => $professions,
            'avator' => optional(Auth::user()->load('profile')->profile)->getFirstMediaUrl('avator_images'),
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
