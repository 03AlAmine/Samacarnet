<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\SpecialtyController;
use App\Http\Controllers\DoctorController;
use App\Models\Doctor;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    // Routes pour les spécialités
    Route::apiResource('specialties', SpecialtyController::class);

    // Routes pour les médecins
    Route::apiResource('doctors', DoctorController::class);

    // Slots disponibles par médecin
    Route::get('doctors/{doctor}/slots', [DoctorController::class, 'availableSlots']);
    Route::get('doctors/{doctor}/slots/{date}', [DoctorController::class, 'getAvailableSlotsByDate']);
    Route::get('/doctors', function () {
        return Doctor::with('user', 'hospital')->get();
    });
    // Gestion des rendez-vous
    Route::prefix('appointments')->group(function () {
        Route::get('/', [AppointmentController::class, 'index']);
        Route::post('/', [AppointmentController::class, 'store']);
        Route::get('/{appointment}', [AppointmentController::class, 'show']);
        Route::put('/{appointment}', [AppointmentController::class, 'update']);
        Route::delete('/{appointment}', [AppointmentController::class, 'destroy']);

        // Actions spécifiques
        Route::post('/{appointment}/confirm', [AppointmentController::class, 'confirmAppointment']);
        Route::post('/{appointment}/cancel', [AppointmentController::class, 'cancelAppointment']);

        // Récupérer les médecins par spécialité
        Route::get('specialties/{specialty}/doctors', [AppointmentController::class, 'getDoctorsBySpecialty']);
    });
});

// Routes d'authentification
require __DIR__ . '/auth.php';

// Routes de configuration
require __DIR__ . '/setting.php';