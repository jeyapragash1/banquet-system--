<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Import all controllers
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\V1\CustomerController;
use App\Http\Controllers\Api\V1\EventInquiryController;
use App\Http\Controllers\Api\V1\InventoryItemController;
use App\Http\Controllers\Api\V1\ExpenseController;
use App\Http\Controllers\Api\V1\EventPackageController;
use App\Http\Controllers\Api\V1\RoomController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\SettingsController;
use App\Http\Controllers\Api\V1\ReportController;
use App\Http\Controllers\Api\V1\ContactController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// --- Public Routes (No login required) ---
Route::post('/login', [AuthController::class, 'login']);
Route::post('/v1/public-inquiry', [EventInquiryController::class, 'publicStore']);
// --- THIS IS THE CORRECTLY PLACED CONTACT ROUTE ---
Route::post('/v1/contact', [ContactController::class, 'submit']);


// --- Protected Admin Routes (Requires authentication token) ---
Route::middleware('auth:sanctum')->group(function () {

    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // For Super-Admin to create new staff accounts
    Route::post('/register', [AuthController::class, 'register']);

    // API Version 1 Routes
    Route::prefix('v1')->group(function () {
        // Dashboard Routes
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/dashboard/chart-data', [DashboardController::class, 'chartData']);

        // Settings Routes
        Route::get('/settings/tax', [SettingsController::class, 'getTaxSettings']);
        Route::post('/settings/tax', [SettingsController::class, 'saveTaxSettings']);

        // Report Generation Route
        Route::post('/reports/generate', [ReportController::class, 'generateReport']);

        // Resourceful routes for each module
        Route::apiResource('customers', CustomerController::class);
        Route::apiResource('event-inquiries', EventInquiryController::class);
        Route::apiResource('inventory-items', InventoryItemController::class);
        Route::apiResource('expenses', ExpenseController::class);
        Route::apiResource('event-packages', EventPackageController::class);
        Route::apiResource('rooms', RoomController::class);
        Route::apiResource('users', UserController::class);
    });
});