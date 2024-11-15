<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FollowUpsController;
use App\Http\Controllers\Api\LeadsController;
use App\Http\Middleware\AccessMiddleware;
use Illuminate\Support\Facades\Route;


Route::get('/login',  [AuthController::class, 'get_login'])->name('login');
Route::post('/login',  [AuthController::class, 'login']);

//authenticated routes
Route::middleware('auth:sanctum')->group(function() {
    Route::post('/leads', [LeadsController::class, 'store']);
    Route::get('/leads/{id?}', [LeadsController::class, 'index']);

    Route::post('/followups', [FollowUpsController::class, 'store']);

    //add access level middleware on this route.
    Route::put('/followups/{id}/status', [FollowUpsController::class, 'update_status'])
    ->middleware(AccessMiddleware::class);
});
