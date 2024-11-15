<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LeadRequest;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;

class LeadsController extends Controller
{
    function store(LeadRequest $request): JsonResponse 
    {
        $lead = Lead::create($request->all());
        return response()->json([
            'error' => false,
            'message' => 'lead has been created',
            'data' => $lead
        ], 201);
    }

    function index(string $id = null)  
    {
        if($id != null) {
            $leads = Lead::find($id);
            if(!$leads) return abort(404);
            $leads->followUps;
        }
        else {
            $leads = Lead::latest()->get();
        }
        
        return response()->json([
            'error' => false,
            'data' => $leads
        ]);
    }
}
