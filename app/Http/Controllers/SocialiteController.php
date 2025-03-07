<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }


    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->setHttpClient(new \GuzzleHttp\Client(['verify' => false])) // Disable SSL verification
                ->user();
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Google login was cancelled or failed. Please try again.');
        }

        // Check if user exists by google_id or email
        $user = User::where('google_id', $googleUser->id)
            ->orWhere('email', $googleUser->email)
            ->first();

        if ($user) {
            // If the user exists but doesn't have a Google ID, update it
            if (!$user->google_id) {
                $user->google_id = $googleUser->id;
                $user->avatar = $googleUser->avatar;
                $user->save();
            }

            Auth::login($user);
        } else {
            // Create a new user
            $user = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'google_id' => $googleUser->id,
                'avatar' => $googleUser->avatar,
                'password' => Hash::make('passworddefault') // Consider using a more secure approach
            ]);

            Auth::login($user);
        }

        return redirect()->route('dashboard');
    }
}
