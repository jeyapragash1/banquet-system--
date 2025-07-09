<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\EventPackage;
use Illuminate\Http\Request;

class EventPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return EventPackage::orderBy('price', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'services' => 'required|string', // We expect a string from the textarea
            'is_popular' => 'boolean',
        ]);
        
        // Convert the newline-separated string of services into a JSON array
        $servicesArray = array_filter(array_map('trim', explode("\n", $validated['services'])));
        $validated['services'] = json_encode($servicesArray);

        $package = EventPackage::create($validated);

        return response()->json($package, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(EventPackage $eventPackage)
    {
        return $eventPackage;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EventPackage $eventPackage)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'services' => 'required|string',
            'is_popular' => 'boolean',
        ]);

        $servicesArray = array_filter(array_map('trim', explode("\n", $validated['services'])));
        $validated['services'] = json_encode($servicesArray);

        $eventPackage->update($validated);

        return response()->json($eventPackage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventPackage $eventPackage)
    {
        $eventPackage->delete();
        return response()->json(null, 204);
    }
}