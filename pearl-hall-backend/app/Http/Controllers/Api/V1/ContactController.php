<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormSubmitted;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        try {
            // Replace with your business's email address
            Mail::to('contact@pearlhall.com')->send(new ContactFormSubmitted($validated));
            
            return response()->json(['message' => 'Your message has been sent successfully!']);

        } catch (\Exception $e) {
            // Log the error for debugging
            \Illuminate\Support\Facades\Log::error('Contact form email failed to send: ' . $e->getMessage());
            return response()->json(['message' => 'Sorry, we could not send your message at this time.'], 500);
        }
    }
}