<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    public function index()
    {
        return Customer::withCount('eventInquiries as total_events')
            ->withSum('eventInquiries as total_spent', 'agreed_amount')
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email',
            'contact_number' => 'required|string|max:20',
            'address' => 'nullable|string',
            'alternate_contact' => 'nullable|string|max:20',
            'pax_sawan' => 'nullable|string',
            'religion_community' => 'nullable|string',
        ]);

        $customer = Customer::create($validated);
        return response()->json($customer, 201);
    }

    public function show(Customer $customer)
    {
        return $customer;
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email,' . $customer->id,
            'contact_number' => 'required|string|max:20',
            'address' => 'nullable|string',
            'alternate_contact' => 'nullable|string|max:20',
            'pax_sawan' => 'nullable|string',
            'religion_community' => 'nullable|string',
        ]);
        
        $customer->update($validated);
        return response()->json($customer);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return response()->json(null, 204);
    }
}