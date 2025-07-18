<?php

namespace App\Http\Controllers;

use App\Models\Specialty;
use Illuminate\Http\Request;

class SpecialtyController extends Controller
{
    public function index()
    {
        return Specialty::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        return Specialty::create($validated);
    }

    public function show(Specialty $specialty)
    {
        return $specialty;
    }

    public function update(Request $request, Specialty $specialty)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string'
        ]);

        $specialty->update($validated);
        return $specialty;
    }

    public function destroy(Specialty $specialty)
    {
        $specialty->delete();
        return response()->noContent();
    }
}