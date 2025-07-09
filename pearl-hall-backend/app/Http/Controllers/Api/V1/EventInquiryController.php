<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\EventInquiry;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EventInquiryController extends Controller
{
    public function index()
    {
        return EventInquiry::with('customer:id,name')->latest()->get();
    }
    
public function store(Request $request)
{
    $validated = $request->validate([
        'customer_id' => 'required|exists:customers,id',
        'inquiry_date' => 'required|date',
        'event_type' => 'required|string',
        'event_date' => 'required|date',
        'agreed_amount' => 'required|numeric',
        'discount_amount' => 'nullable|numeric',
        'advance_payment' => 'nullable|numeric',
        'receipt_number' => 'nullable|string',
        'status' => 'required|string',
        'stage_throne_option' => 'required|string',
        'stage_throne_amount' => 'nullable|numeric',
        'event_taken_by' => 'required|string',
        'event_confirmed_by' => 'nullable|string',
    ]);
    
    // --- THIS IS THE KEY FIX ---
    // Ensure that nullable numeric fields default to 0 if they are not provided.
    $validated['discount_amount'] = $validated['discount_amount'] ?? 0;
    $validated['advance_payment'] = $validated['advance_payment'] ?? 0;
    $validated['stage_throne_amount'] = $validated['stage_throne_amount'] ?? 0;
    
    $inquiry = EventInquiry::create($validated);
    return response()->json($inquiry->load('customer'), 201);
}
    public function publicStore(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'event_date' => 'required|date',
            'time_slot' => 'required|string',
            'guests' => 'required|integer',
        ]);

        try {
            DB::beginTransaction();
            $customer = Customer::updateOrCreate(
                ['email' => $validatedData['email']],
                [
                    'name' => $validatedData['name'],
                    'contact_number' => $request->phone ?? null,
                    'pax_sawan' => $validatedData['guests'] . ' Guests',
                ]
            );
            
            $inquiry = new EventInquiry();
            $inquiry->customer_id = $customer->id;
            $inquiry->inquiry_date = now()->toDateString();
            $inquiry->event_type = 'Website Inquiry - ' . $validatedData['time_slot'];
            $inquiry->event_date = $validatedData['event_date'];
            $inquiry->agreed_amount = 0;
            $inquiry->discount_amount = 0;
            $inquiry->advance_payment = 0;
            $inquiry->event_taken_by = 'Website';
            $inquiry->status = 'Pending';
            $inquiry->save();
            DB::commit();

            return response()->json(['message' => 'Thank you! Your inquiry has been submitted successfully.', 'inquiry' => $inquiry], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Public Inquiry Failed: ' . $e->getMessage());
            return response()->json(['message' => 'An unexpected error occurred. Please try again later.'], 500);
        }
    }

    public function show(EventInquiry $eventInquiry)
    {
        return $eventInquiry->load('customer');
    }

    public function update(Request $request, EventInquiry $eventInquiry)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'inquiry_date' => 'required|date',
            'event_type' => 'required|string',
            'event_date' => 'required|date',
            'agreed_amount' => 'required|numeric',
            'discount_amount' => 'nullable|numeric',
            'advance_payment' => 'nullable|numeric',
            'receipt_number' => 'nullable|string',
            'status' => 'required|string',
            'stage_throne_option' => 'required|string',
            'stage_throne_amount' => 'nullable|numeric',
            'event_taken_by' => 'required|string',
            'event_confirmed_by' => 'nullable|string',
        ]);

        $eventInquiry->update($validated);
        return response()->json($eventInquiry->load('customer'));
    }

    public function destroy(EventInquiry $eventInquiry)
    {
        $eventInquiry->delete();
        return response()->json(null, 204);
    }
}