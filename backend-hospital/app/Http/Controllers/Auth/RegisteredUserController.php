<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->all(); // ou $request->json()->all();

        // vérifie le contenu
        Log::info($data);

        $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'in:male,female'],
            'role' => ['required', 'in:Admin,Doctor,Patient'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $role = $request->role;

        if ($role == 'Patient') {
            $request->validate([
                'cni' => ['required', 'unique:patients,cni'],
                'date_of_birth' => ['nullable', 'date'],
                'city_of_birth' => ['nullable', 'string', 'max:255'],
            ]);
        }

        if ($role == 'Doctor') {
            $request->validate([
                'cni' => ['required', 'unique:doctor,cni'],
                'hospital_id' => ['required', 'exists:hospitals,id'],
                'speciality' => ['nullable', 'string', 'max:255'],
                'matricule' => ['required', 'string', 'max:255'],
                'bio' => ['nullable', 'string'],
                'photo' => ['nullable', 'image', 'max:1024'],
            ]);
        }

        if ($role == 'Admin') {
            $request->validate([
                'function' => ['required', 'string', 'max:255'],
                'hospital_id' => ['nullable', 'exists:hospitals,id'],
            ]);
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'role' => $request->role,
            'email' => $request->email,
            'password' => Hash::make($request->string('password')),
        ]);

        if ($role == 'Patient') {

            Patient::create([
                'user_id' => $user->id,
                'phone' => $request->string('phone'),
                'address' => $request->string('address'),
                'cni' => $request->string('cni'),
                'date_of_birth' => $request->date('date_of_birth'),
                'city_of_birth' => $request->string('city_of_birth'),
                'gender' => $request->gender,
            ]);
        } elseif ($role == 'Doctor') {

            Doctor::create([
                'user_id' => $user->id,
                'speciality' => $request->string('speciality'),
                'phone' => $request->string('phone'),
                'address' => $request->string('address'),
                'bio' => $request->string('bio'),
                'photo' => $request->string('photo'),
                'matricule' => $request->string('matricule'),
                'cni' => $request->string('cni'),
                'date_of_birth' => Carbon::parse($request->date('date_of_birth')),
                'city_of_birth' => $request->string('city_of_birth'),
                'gender' => $request->gender,
            ]);
        } elseif ($role == 'Admin') {

            Admin::create([
                'user_id' => $user->id,
                'function' => $request->string('function'),
                'hospital_id' => $request->hospital_id,
            ]);
        }

        if ($role === 'Patient') {
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user
            ]);
        }

        return response()->json([
            'data' => $user,
            'status' => 'success',
            'message' => 'User registered successfully, but not authenticated.'
        ]);
    }
}
