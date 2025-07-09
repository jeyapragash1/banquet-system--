<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        
        // This is the CRITICAL FIX for the 419 error.
        // It tells Laravel's built-in CSRF protection to ignore all routes
        // that start with 'api/'. This includes your '/api/login' route.
        $middleware->validateCsrfTokens(except: [
            'api/*', // Exclude all API routes from CSRF protection
        ]);
        
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // This part correctly handles the "Unauthenticated" error for your API.
        $exceptions->render(function (\Illuminate\Auth\AuthenticationException $e, \Illuminate\Http\Request $request) {
            if ($request->is('api/*')) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }
        });
    })->create();