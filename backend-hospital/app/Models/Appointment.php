<?php

// app/Models/Appointment.php
// app/Models/Appointment.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'patient_id',
        'doctor_id',
        'hospital_id',
        'appointment_date',
        'status',
        'patient_id', // Ajoutez ce champ
        'reason'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }
}