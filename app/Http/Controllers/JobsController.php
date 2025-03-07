<?php

namespace App\Http\Controllers;

use App\Models\ExperienceLevel;
use App\Models\Industry;
use App\Models\Job;
use App\Models\Profession;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Tag;

class JobsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Job::with(['tags', 'companyProfile', 'profession', 'industry', 'seniority']);

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

        $seniorities = ExperienceLevel::pluck('name');
        $industries = Industry::pluck('name');
        $professions = Profession::pluck('name');

        // Get tags with job counts manually
        $tags = Tag::get()->map(function ($tag) {
            $tag->jobs_count = Job::whereHas('tags', function ($query) use ($tag) {
                $query->where('tags.id', $tag->id);
            })->count();
            return $tag;
        });

        // Append logo URL for each job (assuming 'profile_images' is the media collection name)
        $jobs->transform(function ($job) {
            $job->logo = $job->companyProfile
                ? $job->companyProfile->getFirstMediaUrl('profile_images')
                : null;
            return $job;
        });

        return Inertia::render('Jobs', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'jobs' => $jobs,
            'tags' => $tags, // Now each tag will have a 'jobs_count' field
            'seniorities' => $seniorities,
            'industries' => $industries,
            'professions' => $professions,
            'avator' => optional(Auth::user()->load('profile')->profile)->getFirstMediaUrl('avator_images'),
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        // Perform the search
        $jobs = Job::search($query)->query(function ($q) use ($request) {
            $q->with(['tags', 'companyProfile', 'profession', 'industry', 'seniority']);

            // Handle published filter
            if ($request->filled('published')) {
                switch ($request->published) {
                    case 'Last 1 Week':
                        $q->where('created_at', '>=', now()->subWeek());
                        break;
                    case 'Last 30 Days':
                        $q->where('created_at', '>=', now()->subDays(30));
                        break;
                    case 'Latest 24 Hours':
                        $q->where('created_at', '>=', now()->subDay());
                        break;
                }
            }

            if ($request->filled('seniority')) {
                $q->whereHas('seniority', function ($subQuery) use ($request) {
                    $subQuery->where('name', $request->seniority);
                });
            }

            if ($request->filled('industry')) {
                $q->whereHas('industry', function ($subQuery) use ($request) {
                    $subQuery->where('name', $request->industry);
                });
            }

            if ($request->filled('profession')) {
                $q->whereHas('profession', function ($subQuery) use ($request) {
                    $subQuery->where('name', $request->profession);
                });
            }
        })->paginate(20);

        // Get tags with job counts manually
        $tags = Tag::get()->map(function ($tag) {
            $tag->jobs_count = Job::whereHas('tags', function ($query) use ($tag) {
                $query->where('tags.id', $tag->id);
            })->count();
            return $tag;
        });

        // Append logo URL for each job
        $jobs->transform(function ($job) {
            $job->logo = $job->companyProfile
                ? $job->companyProfile->getFirstMediaUrl('profile_images')
                : null;
            return $job;
        });

        return Inertia::render('Jobs', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'jobs' => $jobs,
            'tags' => $tags, // Now each tag will have a 'jobs_count' field
            'seniorities' => ExperienceLevel::pluck('name'),
            'industries' => Industry::pluck('name'),
            'professions' => Profession::pluck('name'),
            'avator' => optional(Auth::user()->load('profile')->profile)->getFirstMediaUrl('avator_images'),
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $professions = Profession::all();
        $industries = Industry::all();
        $seniorities = ExperienceLevel::all();

        return Inertia::render('CreateJob', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'professions' => $professions,
            'industries' => $industries,
            'seniorities' => $seniorities,
            'avator' => optional(Auth::user()->load('profile')->profile)->getFirstMediaUrl('avator_images'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'profession_id' => 'required|string',
            'industry_id' => 'required|string',
            'seniority_id' => 'required|string',
            'description' => 'required|string',
            'tags' => 'nullable|string', // Tags as a comma-separated string
        ]);

        $validated['creator'] = Auth::id();

        $job = Job::create($validated);

        if ($request->tags) {
            $tags = explode(',', $request->tags); // Convert to an array

            $formattedTags = collect($tags)->map(function ($tag) {
                $tag = trim($tag);

                // Check if tag exists in the database
                $existingTag = \Spatie\Tags\Tag::where('slug->en', Str::slug($tag))->first();

                if ($existingTag) {
                    return $existingTag->name; // Use existing tag
                }

                // Create new tag only if it does not exist
                return ['en' => $tag];
            })->unique(); // Remove duplicates

            $job->attachTags($formattedTags); // Attach only unique tags
        }

        return redirect()->back()->with('success', 'Job saved successfully!');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $job = Job::with(['tags', 'profession', 'industry', 'seniority', 'creator', 'companyProfile'])
            ->findOrFail($id);

        return Inertia::render('JobDetails', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'job' => $job,
            'logo' => optional($job->companyProfile)->getFirstMediaUrl('profile_images') ?: null,
            'cover_image' => optional($job->companyProfile)->getFirstMediaUrl('cover_image') ?: null,
            'avator' => optional(Auth::user()->load('profile')->profile)->getFirstMediaUrl('avator_images'),
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $job = Job::with('tags')->findOrFail($id);
        $professions = Profession::all();
        $industries = Industry::all();
        $seniorities = ExperienceLevel::all();

        return Inertia::render('EditJob', array_merge(
            session()->only(['success', 'error']),
            [
                'permissions' => Auth::check() ? Auth::user()->getAllPermissions()->pluck('name') : [],
                'job' => $job,
                'professions' => $professions,
                'industries' => $industries,
                'seniorities' => $seniorities,
                'avator' => optional(Auth::user()->load('profile')->profile)->getFirstMediaUrl('avator_images'),
            ]
        ));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $job = Job::findOrFail($id);

        // Validate request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'profession_id' => 'required|string',
            'industry_id' => 'required|string',
            'seniority_id' => 'required|string',
            'description' => 'required|string',
            'tags' => 'nullable|string', // Tags as a comma-separated string
        ]);

        // Remove 'tags' from validated data to prevent duplicate storage
        unset($validated['tags']);

        // Update job details
        $job->update($validated);

        // Handle tags properly
        if ($request->filled('tags')) {
            // Trim spaces and remove empty values
            $tags = array_filter(array_map('trim', explode(',', $request->tags)));

            // Process each tag
            $formattedTags = collect($tags)->map(function ($tag) {
                $tag = trim($tag);
                $slug = Str::slug($tag); // Use Str::slug to generate a consistent slug

                // Check if tag exists in the database
                $existingTag = \Spatie\Tags\Tag::where('slug->en', $slug)->first();

                if ($existingTag) {
                    return $existingTag->name; // Use existing tag
                }

                // Create new tag only if it does not exist
                return ['en' => $tag];
            })->unique(); // Remove duplicates

            $job->syncTags($formattedTags); // Sync only unique tags
        } else {
            $job->syncTags([]); // Clear tags if none are provided
        }

        return redirect()->back()->with('success', 'Job updated successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function toggle($id)
    {
        $job = Job::findOrFail($id);
        $job->active = !$job->active;
        $job->save();

        return response()->json(['success' => true, 'active' => $job->active]);
    }
}
