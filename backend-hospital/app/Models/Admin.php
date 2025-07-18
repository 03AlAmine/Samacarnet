<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $fillable = [
        'function',
        'hospital_id',
        'user_id',
    ];

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
