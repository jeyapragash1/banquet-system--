<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // This is the corrected way to load nested relationships.
        // It fetches rooms, and for each room, it fetches the event inquiry,
        // and for that inquiry, it fetches the related customer.
        return Room::with('eventInquiry.customer')->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'event_inquiry_id' => 'nullable|exists:event_inquiries,id',
        ]);

        if ($validated['event_inquiry_id']) {
            $existingAssignment = Room::where('event_inquiry_id', $validated['event_inquiry_id'])->where('id', '!=', $room->id)->first();
            if ($existingAssignment) {
                return response()->json(['message' => 'This event is already assigned to another room (' . $existingAssignment->name . ').'], 422);
            }
            $room->event_inquiry_id = $validated['event_inquiry_id'];
            $room->status = 'Booked';
        } else {
            $room->event_inquiry_id = null;
            $room->status = 'Available';
        }

        $room->save();

        return response()->json($room->load('eventInquiry.customer'));
    }
}