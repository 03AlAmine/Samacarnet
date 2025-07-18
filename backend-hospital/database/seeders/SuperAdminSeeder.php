<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

       $user = User::create([
            'first_name' => 'Salomon',
            'last_name' => 'Mbengue',
            'role' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('DataDoctor'),
        ]);

        Admin::create([
            'user_id' => $user->id,
            'function' => 'Administrator',
            'hospital_id' => null,
        ]);
    }
}
