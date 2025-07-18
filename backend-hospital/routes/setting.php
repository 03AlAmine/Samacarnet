<?php

use App\Http\Controllers\Hospital\HospitalController;
use App\Http\Controllers\Setting\Role\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// -------------Role Routes----------------
Route::get('/settings/roles', [RoleController::class, 'index'])
    ->name('settings.roles.index');

Route::get('/settings/roles/{id}', [RoleController::class, 'show'])
    ->name('settings.roles.show');

Route::post('/settings/roles', [RoleController::class, 'store'])
    ->name('settings.roles.store');

Route::put('/settings/roles/{id}', [RoleController::class, 'update'])
    ->name('settings.roles.update');

Route::delete('/settings/roles/{id}', [RoleController::class, 'destroy'])
    ->name('settings.roles.destroy');

// -------------Hospital Routes----------------


Route::get('/hospitals', [HospitalController::class, 'index'])
    ->name('hospitals.index');

Route::get('/hospitals/{id}', [HospitalController::class, 'show'])
    ->name('hospitals.show');

Route::post('/hospitals', [HospitalController::class, 'store'])
    ->name('hospitals.store');

Route::put('/hospitals/{id}', [HospitalController::class, 'update'])
    ->name('hospitals.update');

Route::delete('/hospitals/{id}', [HospitalController::class, 'destroy'])
    ->name('hospitals.destroy');
