<?php

namespace App\Http\Controllers\Hospital;

use App\Http\Controllers\Controller;
use App\Models\Hospital;
use Illuminate\Http\Request;

class HospitalController extends Controller
{
    public function index(Request $request)
    {
        $hospitals = Hospital::all();
        return response()->json($hospitals);
    }

    public function show(Request $request, $id)
    {
        $hospital = Hospital::find($id);
        if (!$hospital) {
            return response()->json(['error' => 'Hospital not found'], 404);
        }
        return response()->json($hospital);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'logo' => ['nullable', 'image', 'max:2048'],
            'description' => ['nullable', 'string'],
        ]);

        $hospital = Hospital::create($request->all());
        return response()->json($hospital, 201);
    }

    public function update(Request $request, $id)
    {
        $hospital = Hospital::find($id);
        if (!$hospital) {
            return response()->json(['error' => 'Hospital not found'], 404);
        }

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'logo' => ['nullable', 'image', 'max:2048'],
            'description' => ['nullable', 'string'],
        ]);

        $hospital->update($request->all());
        return response()->json($hospital);
    }

    public function destroy(Request $request, $id)
    {
        $hospital = Hospital::find($id);
        if (!$hospital) {
            return response()->json(['error' => 'Hospital not found'], 404);
        }

        $hospital->delete();
        return response()->json(['message' => 'Hospital deleted successfully']);
    }
}
