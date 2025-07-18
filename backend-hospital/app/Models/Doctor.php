<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'hospital_id',
        'speciality', // Conservez ce champ si vous l'utilisez directement
        'cni',
        'matricule',
        'address',
        'phone',
        'gender',
        'bio',
        'photo'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }
}
