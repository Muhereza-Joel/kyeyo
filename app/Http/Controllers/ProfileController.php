<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Profile;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function renderUserProfile()
    {
        $user = Auth::user()->load(['profile']); // Load the authenticated user's profile
        $profile = Profile::where('user_id', Auth::id())->first();

        return Inertia::render('Profile/UserProfile', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'success' => session('success'),
            'error' => session('error'),
            'user' => $user, // Pass the user with the profile to the view
            'logo' => $profile ? $profile->getFirstMediaUrl('avator_images') : null,
            'cover_image' => $profile ? $profile->getFirstMediaUrl('cover_image') : null,
        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function updateBioData(Request $request)
    {
        $user = Auth::user();
        // dd($request->all());
        // dd($request->file('logo'), $request->file('cover_image'));


        $validated = $request->validate([
            'fullname' => 'nullable|string|max:50',
            'phone_number' => [
                'nullable',
                'string',
                'max:20',

            ],
            'nin' => [
                'nullable',
                'string',
                'max:20',

            ],
            'date_of_birth' => [
                'nullable',
                'date',
                'before:' . now()->subYears(18)->format('Y-m-d'), // Ensures the date is at least 18 years ago
            ],
            'gender' => 'nullable|string|max:6|in:male,female,other',
            'country' => 'nullable|string|max:20',
            'district' => 'nullable|string|max:30',
            'village' => 'nullable|string|max:30',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Ensure the user has a profile
        if ($user->profile) {
            $user->profile->update($validated);
        } else {
            // If no profile exists, create one
            $validated['user_id'] = $user->id;
            Profile::create($validated);
        }

        // Upload Logo if a new file is provided

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $logoFileName = uniqid('logo_', true) . '.' . $file->getClientOriginalExtension();

            $user->profile->addMedia($file)
                ->usingFileName($logoFileName)
                ->toMediaCollection('avator_images');
        }

        // Upload Cover Image if a new file is provided
        if ($request->hasFile('cover_image')) {
            $coverFile = $request->file('cover_image');
            $coverFileName = uniqid('cover_', true) . '.' . $coverFile->getClientOriginalExtension();

            $user->profile->addMedia($coverFile)
                ->usingFileName($coverFileName)
                ->toMediaCollection('profile_cover_images');
        }

        return redirect()->route('edit-user-profile')->with('success', 'Profile updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
