<?php

namespace App\Http\Controllers;

use App\Models\CompanyProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CompanyProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $profile = CompanyProfile::where('user_id', Auth::id())->first();

        return Inertia::render('CompanyProfileDisplay', [
            'profile' => $profile,
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'success' => session('success'),
            'error' => session('error'),
            'logo' => $profile ? $profile->getFirstMediaUrl('profile_images') : null,
            'cover_image' => $profile ? $profile->getFirstMediaUrl('cover_image') : null,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateCompanyProfile', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'industry' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email|max:255|unique:company_profiles,email',
            'address' => 'required|string',
            'country' => 'required|string',
            'city' => 'required|string',
            'website' => 'required|url|max:255', // Ensures a valid URL
            'logo' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'about' => 'required|string',
            'founded_year' => 'required',
            'company_size' => 'required|string',
        ]);


        $validated['user_id'] = Auth::id();

        unset($validated['logo']);
        unset($validated['cover_image']);

        // Create the company profile
        $profile = CompanyProfile::create($validated);

        // Upload Logo
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');

            // Generate a unique file name
            $logoFileName = uniqid('logo_', true) . '.' . $file->getClientOriginalExtension();

            // Add media with the generated unique file name
            $profile->addMedia($file)
                ->usingFileName($logoFileName)
                ->toMediaCollection('profile_images');
        }

        // Upload Cover Image
        if ($request->hasFile('cover_image')) {
            $coverFile = $request->file('cover_image');

            // Generate a unique file name
            $coverFileName = uniqid('cover_', true) . '.' . $coverFile->getClientOriginalExtension();

            // Add media with the generated unique file name
            $profile->addMedia($coverFile)
                ->usingFileName($coverFileName)
                ->toMediaCollection('cover_image'); // Store in a different media collection
        }

        return redirect()->back()->with('success', 'Company profile created successfully.');
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
        $profile = CompanyProfile::findOrFail($id);

        return Inertia::render('EditCompanyProfile', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'success' => session('success'),
            'error' => session('error'),
            'profile' => $profile,
            'logo' => $profile->getFirstMediaUrl('profile_images') ?: null, //use collection name
            'cover_image' => $profile->getFirstMediaUrl('cover_image') ?: null, //use collection name
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $profile = CompanyProfile::findOrFail($id);

        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'industry' => 'required|string',
            'phone' => 'required|string',
            'email' => ['required', 'email', 'max:255', Rule::unique('company_profiles', 'email')->ignore($profile->id)],
            'address' => 'required|string',
            'country' => 'required|string',
            'city' => 'required|string',
            'website' => 'required|url|max:255',
            'logo' => ['nullable', function ($attribute, $value, $fail) {
                if (!is_string($value) && !($value instanceof \Illuminate\Http\UploadedFile)) {
                    $fail('Invalid logo format.');
                }
            }],
            'cover_image' => ['nullable', function ($attribute, $value, $fail) {
                if (!is_string($value) && !($value instanceof \Illuminate\Http\UploadedFile)) {
                    $fail('Invalid cover image format.');
                }
            }],
            'about' => 'required|string',
            'founded_year' => 'required',
            'company_size' => 'required|string',
        ]);

        // Remove logo and cover_image if they are URLs (meaning they haven't changed)
        if (is_string($validated['logo'] ?? null)) {
            unset($validated['logo']);
        }

        if (is_string($validated['cover_image'] ?? null)) {
            unset($validated['cover_image']);
        }

        // Update other fields
        $profile->update($validated);

        // Upload Logo only if a new file is provided
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $logoFileName = uniqid('logo_', true) . '.' . $file->getClientOriginalExtension();

            $profile->addMedia($file)
                ->usingFileName($logoFileName)
                ->toMediaCollection('profile_images');
        }

        // Upload Cover Image only if a new file is provided
        if ($request->hasFile('cover_image')) {
            $coverFile = $request->file('cover_image');
            $coverFileName = uniqid('cover_', true) . '.' . $coverFile->getClientOriginalExtension();

            $profile->addMedia($coverFile)
                ->usingFileName($coverFileName)
                ->toMediaCollection('cover_image');
        }

        return redirect()->back()->with('success', 'Company profile updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
