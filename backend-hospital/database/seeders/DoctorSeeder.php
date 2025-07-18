<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Hospital;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'first_name' => 'Salimata',
            'last_name' => 'Mbengue',
            'role' => 'Doctor',
            'email' => 'doctor@doctor.com',
            'password' => bcrypt('DataDoctor'),
        ]);

        $Hospital = Hospital::first();
        if (!$Hospital) {
            $Hospital = Hospital::create([
                'name' => 'Hôpital Principal',
                'address' => 'Dakar, Sénégal',
                'phone' => '33 845 65 78',
                'description' => 'Hôpital Principal est un établissement de santé de référence à Dakar, offrant des services médicaux de qualité.',
            ]);
        }

        Doctor::create([
            'user_id' => $user->id,
            'cni' => '123456789',
            'hospital_id' => $Hospital->id,
            'speciality' => 'Cardiology',
            'matricule' => 'DOC-001',
            'address' => 'Dakar',
            'phone' => '77 123 45 67',
            'gender' => 'Female',
            'bio' => 'Cardiologist with 10 years of experience.',
            'Photo' => 'doctors/photo.jpg',
        ]);
    }
}
