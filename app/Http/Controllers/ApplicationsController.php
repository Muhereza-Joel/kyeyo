<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApplicationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Application::with(['user', 'job']);
        $user = Auth::user();

        // Role-based filtering
        if ($user->hasRole(['root', 'company'])) {
            // Job creators (root & company) can only see applications for jobs they created
            $query->whereHas('job', function ($q) use ($user) {
                $q->where('creator', $user->id);
            });
        } elseif ($user->hasRole('technician')) {
            // Technician should only see applications they submitted
            $query->where('user_id', $user->id);
        }

        // Apply status filter if provided
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Apply time filter if provided
        if ($request->has('time') && $request->time !== 'all') {
            $now = now();
            switch ($request->time) {
                case 'To Day':
                    $query->whereDate('created_at', $now->toDateString());
                    break;
                case 'This Week':
                    $query->whereBetween('created_at', [$now->startOfWeek(), $now->endOfWeek()]);
                    break;
                case 'This Month':
                    $query->whereBetween('created_at', [$now->startOfMonth(), $now->endOfMonth()]);
                    break;
                case 'Last Three Months':
                    $query->where('created_at', '>=', $now->subMonths(3)->startOfMonth());
                    break;
            }
        }

        $applications = $query->paginate(20);

        return Inertia::render('Applications', [
            'permissions' => $user->getAllPermissions()->pluck('name'),
            'success' => session('success'),
            'error' => session('error'),
            'applications' => $applications,
            'avator' => optional(Auth::user()->load('profile')->profile)->getFirstMediaUrl('avator_images'),
        ]);
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
        $validated = $request->validate([
            'cover_letter' => 'required',
            'job_id' => 'required|string|exists:jobs,id',
            'cv' => 'required|file|mimes:pdf,doc,docx',
            'transcript' => 'nullable|file|mimes:pdf,doc,docx',
        ]);

        $application = Application::create([
            'user_id' => auth()->id(),
            'job_id' => $validated['job_id'],
            'cover_letter' => $validated['cover_letter'],
            'status' => 'pending',
        ]);

        if ($request->hasFile('cv')) {
            $application->addMedia($request->file('cv'))->toMediaCollection('cv');
        }

        if ($request->hasFile('transcript')) {
            $application->addMedia($request->file('transcript'))->toMediaCollection('transcript');
        }

        return redirect()->back()->with('success', 'Application submitted successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $application = Application::with(['user', 'job', 'job.profession', 'media'])->findOrFail($id);
        return Inertia::render('ApplicationDetails', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'success' => session('success'),
            'error' => session('error'),
            'application' => $application,
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
        $validated = $request->validate([
            'status' => 'required|string|in:pending,reviewed,accepted,rejected',
            'comments' => 'required|string',
        ]);

        $application = Application::findOrFail($id);
        $application->update($validated);

        return redirect()->back()->with('success', 'Application Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function apply(string $id)
    {
        return Inertia::render('CreateApplication', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'job_id' => $id,
            'avator' => optional(Auth::user()->load('profile')->profile)->getFirstMediaUrl('avator_images'),
        ]);
    }
}
