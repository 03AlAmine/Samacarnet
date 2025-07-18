<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'phone',
        'address',
        'cni',
        'date_of_birth',
        'city_of_birth',
        'gender',
        'user_id',
    ];

    protected $table = 'patients';

    /**
     * Get the user associated with the patient.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all medical files for the patient.
     */
    public function medicalFiles()
    {
        return $this->belongsTo(MedicalFile::class);
    }
}
