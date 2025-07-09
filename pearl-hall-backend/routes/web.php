<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\V1\EventInquiryController;

// This defines a group of routes that will still have the `/api/` prefix
// but will benefit from the session middleware of the web.php file.
Route::prefix('api')->group(function () {

    // These routes NEED a session to work, so they live here now.
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    
    // The public inquiry form also makes a POST request, so it belongs here too.
    Route::post('/v1/public-inquiry', [EventInquiryController::class, 'publicStore']);
});

// The default welcome route. You can leave this or remove it.
Route::get('/', function () {
    return view('welcome');
});