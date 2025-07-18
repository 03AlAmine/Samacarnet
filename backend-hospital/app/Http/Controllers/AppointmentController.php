<?php


// app/Http/Controllers/AppointmentController.php
namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Hospital;
use App\Models\Specialty;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::with(['patient', 'doctor', 'hospital'])->get();
        return response()->json($appointments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'hospital_id' => 'required|exists:hospitals,id',
            'appointment_date' => 'required|date',
            'reason' => 'nullable|string',
            'patient_id' => 'required|exists:users,id', // Validation pour patient_id

        ]);

        $appointment = Appointment::create($validated);
        return response()->json($appointment, 201);
    }

    public function show(Appointment $appointment)
    {
        return response()->json($appointment->load(['patient', 'doctor', 'hospital']));
    }

    public function update(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'doctor_id' => 'sometimes|exists:doctors,id',
            'hospital_id' => 'sometimes|exists:hospitals,id',
            'appointment_date' => 'sometimes|date',
            'status' => 'sometimes|in:pending,confirmed,cancelled',
            'reason' => 'nullable|string'
        ]);

        $appointment->update($validated);
        return response()->json($appointment);
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return response()->json(null, 204);
    }

    public function getDoctorsByHospital($hospitalId)
    {
        $doctors = Doctor::where('hospital_id', $hospitalId)->with('specialty')->get();
        return response()->json($doctors);
    }

    public function getAvailableSlots($doctorId, $date)
    {
        $date = \Carbon\Carbon::parse($date)->format('Y-m-d');

        $takenSlots = Appointment::where('doctor_id', $doctorId)
            ->whereDate('appointment_date', $date)
            ->get()
            ->map(function ($app) {
                return \Carbon\Carbon::parse($app->appointment_date)->format('H:i');
            })
            ->toArray();

        $allSlots = $this->generateTimeSlots();

        $availableSlots = array_diff($allSlots, $takenSlots);

        return response()->json($availableSlots);
    }

    private function generateTimeSlots()
    {
        $slots = [];
        $start = strtotime('08:00');
        $end = strtotime('18:00');

        for ($i = $start; $i <= $end; $i += 1800) {
            $slots[] = date('H:i', $i);
        }
        return $slots;
    }
    public function
    confirmAppointment(Appointment $appointment)
    {
        $appointment->update(['status' => 'confirmed']);
        return response()->json($appointment);
    }

    public function cancelAppointment(Appointment $appointment)
    {
        $appointment->update(['status' => 'cancelled']);
        return response()->json($appointment);
    }
}
