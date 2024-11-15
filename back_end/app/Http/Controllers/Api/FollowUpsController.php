<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FollowUpRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\FollowUp;

class FollowUpsController extends Controller
{
    //Use FollowUpRequest to validate request data
    function store(FollowUpRequest $request): JsonResponse 
    {
        $follow_up = FollowUp::create($request->all());
        return response()->json([
            'error' => false,
            'message' => 'follow up has been created',
            'data' => $follow_up
        ], 201);
    }

    function update_status(string $id, Request $request) 
    {
        $follow_up = FollowUp::find($id);
        if(!$follow_up) return abort(404, "Item not found");

        //validate request, make sure status is provided
        $request->validate([
            'status' => 'required|string|in:Pending,Completed,Missed',
        ]);

        $follow_up->status = $request->status;
        $follow_up->save();

        return response()->json([
            'error' => false,
            'message' => 'Status has been updated',
            'data' => $follow_up
        ]);
    }
}
