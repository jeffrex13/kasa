<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * GET /api/v1/users/me
     */
    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $request->user(),
        ]);
    }

    /**
     * PUT /api/v1/users/me
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'gender' => 'nullable|in:male,female,other',
            'age' => 'nullable|integer|min:18|max:100',
            'budget_min' => 'nullable|integer|min:0',
            'budget_max' => 'nullable|integer|min:0|gte:budget_min',
            'lifestyle_tags' => 'nullable|array',
            'lifestyle_tags.*' => 'string',
        ]);

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $user,
        ]);
    }
}