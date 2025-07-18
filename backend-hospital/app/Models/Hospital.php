<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'address',
        'phone',
        'logo',
        'description',
    ];

    /**
     * Get the doctors associated with the hospital.
     */
    public function doctors()
    {
        return $this->hasMany(Doctor::class);
    }

    

}
