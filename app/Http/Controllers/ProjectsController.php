<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Projects', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'projects' => Project::where('user_id', Auth::id()) // Filter projects by user_id
                ->orderBy('created_at', 'desc') // Sort by most recent
                ->get(),
            'avator' => optional(Auth::user()->load('profile')->profile)->getFirstMediaUrl('avator_images'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return  Inertia::render('CreateProject', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
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
            'description' => 'required|string',
        ]);

        $validated['user_id'] = Auth::id();

        $job = Project::create($validated);

        return redirect()->back()->with('success', 'Project saved successfully! Go a head add add a gallery of images to the project?');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $project = Project::findOrFail($id);

        return Inertia::render('EditProject', array_merge(
            session()->only(['success', 'error']),
            [
                'permissions' => Auth::check() ? Auth::user()->getAllPermissions()->pluck('name') : [],
                'project' => $project,
                'avator' => optional(Auth::user()->load('profile')->profile)->getFirstMediaUrl('avator_images'),
            ]
        ));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $project = Project::findOrFail($id);

        // Validate request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $project->update($validated);

        return redirect()->back()->with('success', 'Project details updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function gallery(string $id)
    {
        $project = Project::findOrFail($id);
        $images = $project->getMedia('project_gallery')->map(function ($media) {
            return [
                'id' => $media->id,
                'url' => $media->getUrl(), // Get the URL of the media file
            ];
        });

        return  Inertia::render('ProjectGallery', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'avator' => optional(Auth::user()->load('profile')->profile)->getFirstMediaUrl('avator_images'),
            'project_id' => $id,
            'images' => $images,
        ]);
    }

    public function storeGallery(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Max 2MB per image
        ]);

        $project = Project::findOrFail($request->project_id);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $project->addMedia($image)->toMediaCollection('project_gallery');
            }
        }

        return redirect()->back()->with('success', 'Gallery successfully!');
    }

    public function deleteImage($project_id, $media_id)
    {
        $project = Project::findOrFail($project_id);
        $media = Media::findOrFail($media_id);

        // Ensure the media belongs to the project
        if ($media->model_id == $project->id) {
            $media->delete();  // Deletes the image from the media collection
            return response()->json(['message' => 'Image deleted successfully.'], 200); // Return success response
        }

        return response()->json(['message' => 'Image not found or does not belong to the project.'], 404); // Return error response
    }


    public function editGallery() {}
}
