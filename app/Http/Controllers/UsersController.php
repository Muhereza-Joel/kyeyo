<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UsersController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Start the query to fetch users along with roles and permissions
        $usersQuery = User::with(['roles', 'permissions'])
            ->whereDoesntHave('roles', function ($query) {
                $query->where('name', 'root');
            });

        // Dynamically apply filters based on the request parameters
        $filters = $request->only(['account_status', 'role']); // Fetch only filters from the request

        foreach ($filters as $filter => $value) {
            // If a filter value is not 'all' or empty, apply it to the query
            if (!empty($value) && $value !== 'all') {
                if ($filter === 'account_status') {
                    $usersQuery->where('account_status', $value);
                } elseif ($filter === 'role') {
                    $usersQuery->whereHas('roles', function ($query) use ($value) {
                        $query->where('name', $value);
                    });
                }
            }
        }

        // Get the filtered users with pagination
        $users = $usersQuery->paginate(10); // Apply pagination before calling get()

        return Inertia::render('Users', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'success' => session('success'),
            'error' => session('error'),
            'users' => $users, // Includes roles and permissions
            'avator' => optional(Auth::user()->load('profile')->profile)->getFirstMediaUrl('avator_images'),
        ]);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();
        return Inertia::render('CreateUser', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'roles' => $roles,
            'success' => session('success'),
            'error' => session('error'),
            'avator' => optional(Auth::user()->load('profile')->profile)->getFirstMediaUrl('avator_images'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $messages = [
            'name.required' => 'The name field is required.',
            'name.unique' => 'This name is already taken.',
            'email.required' => 'The email field is required.',
            'email.unique' => 'This email is already registered.',
            'password.required' => 'A password is required.',
            'password.min' => 'Password must be at least 8 characters.',
            'role.required' => 'The role field is required.',
        ];

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:users,name',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required',
        ], $messages);

        // Extract the role UUID and find the role
        $roleUuid = $validated['role'];
        $role = Role::where('uuid', $roleUuid)->first();

        // If no valid role is found, return with an error message
        if (!$role) {
            return redirect()->back()->withErrors(['role' => 'Invalid role selected.']);
        }

        // Create user only if a valid role is found
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        // Assign the role to the user
        $user->assignRole($role->name);

        return redirect()->back()->with('success', 'User created successfully!');
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
