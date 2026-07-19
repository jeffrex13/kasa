<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    // GET: /api/listings
    public function index()
    {
        return response()->json(Listing::latest()->get());
    }

    // POST: /api/listings
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'location' => 'required|string|max:255',
            'type' => 'required|string|in:Bedspace,Solo Room,Condo Share,Entire Apartment',
            'gender' => 'required|string|in:Female Only,Male Only,Co-ed,Any',
            'landlord_name' => 'required|string|max:255',
            'rules' => 'nullable|array',
            'features' => 'nullable|array',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            
            // THE BUSINESS RULE: Only required if the type is a shared accommodation
            'available_slots' => 'required_if:type,Bedspace,Condo Share|nullable|integer|min:1',
        ]);

        $listing = Listing::create($validated);

        return response()->json($listing, 201);
    }

    // GET: /api/listings/{id}
    public function show(Listing $listing)
    {
        return response()->json($listing);
    }

    // PUT/PATCH: /api/listings/{id}
    public function update(Request $request, Listing $listing)
    {
        // Use the same validation rules as store, but maybe make them sometimes nullable if doing partial updates
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric|min:0',
            // ... (include the rest of the fields here with the 'sometimes' flag)
            'available_slots' => 'sometimes|required_if:type,Bedspace,Condo Share|integer|min:1',
        ]);

        $listing->update($validated);

        return response()->json($listing);
    }

    // DELETE: /api/listings/{id}
    public function destroy(Listing $listing)
    {
        $listing->delete();

        return response()->json(['message' => 'Listing deleted successfully']);
    }
}