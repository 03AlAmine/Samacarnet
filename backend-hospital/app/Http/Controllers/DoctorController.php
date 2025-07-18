<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
// Pour DoctorController
public function index(Request $request)
{
    $query = Doctor::query();
    
    if ($request->has('ids')) {
        $query->whereIn('id', explode(',', $request->ids));
    }
    
    return $query->get(['id', 'first_name', 'last_name', 'speciality']);
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'specialty_id' => 'required|exists:specialties,id',
            'hospital_id' => 'required|exists:hospitals,id'
        ]);

        return Doctor::create($validated);
    }

    public function show(Doctor $doctor)
    {
        return $doctor->load('specialty', 'hospital');
    }

    public function update(Request $request, Doctor $doctor)
    {
        $validated = $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'specialty_id' => 'sometimes|exists:specialties,id',
            'hospital_id' => 'sometimes|exists:hospitals,id'
        ]);

        $doctor->update($validated);
        return $doctor;
    }

    public function destroy(Doctor $doctor)
    {
        $doctor->delete();
        return response()->noContent();
    }

    public function availableSlots(Doctor $doctor)
    {
        // Logique pour récupérer les créneaux disponibles par défaut
        return $this->generateTimeSlots();
    }

    public function getAvailableSlotsByDate(Doctor $doctor, $date)
    {
        // Vérifier la validité de la date
        if (!Carbon::hasFormat($date, 'Y-m-d')) {
            return response()->json(['error' => 'Format de date invalide'], 400);
        }

        // Récupérer les rendez-vous existants
        $takenSlots = $doctor->appointments()
            ->whereDate('appointment_date', $date)
            ->pluck('appointment_time')
            ->toArray();

        // Générer tous les créneaux possibles
        $allSlots = $this->generateTimeSlots();

        // Filtrer les créneaux disponibles
        $availableSlots = array_diff($allSlots, $takenSlots);

        return response()->json($availableSlots);
    }

    private function generateTimeSlots()
    {
        $slots = [];
        $start = strtotime('08:00');
        $end = strtotime('18:00');

        for ($i = $start; $i <= $end; $i += 1800) { // 1800 secondes = 30 minutes
            $slots[] = date('H:i', $i);
        }

        return $slots;
    }
}