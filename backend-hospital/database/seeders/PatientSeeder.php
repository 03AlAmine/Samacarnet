<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'first_name' => 'Mantoulaye',
            'last_name' => 'Diallo',
            'role' => 'Patient',
            'email' => 'patient@patient.com',
            'password' => bcrypt('DataDoctor'),
        ]);

        $user->patient()->create([
            'user_id' => $user->id,
            'cni' => '987654321',
            'address' => 'Dakar',
            'phone' => '77 987 65 43',
            'date_of_birth' => '1990-01-01',
            'city_of_birth' => 'Dakar',
            'gender' => 'Female',
        ]);
    }
}
