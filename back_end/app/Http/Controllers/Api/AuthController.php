<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    function login(Request $request)  
    {        
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        
        if(Auth::attempt($credentials )){
            //use this so linter does not throw warning when using createToken
            //you can use $user = Auth::user()
            $id = Auth::user()->id;
            $user = User::find($id);

            return response()->json([
                'error' => false,
                'user' => $user,
                'token' => $user->createToken('Leads_App')->plainTextToken,
            ]);
        }

        return response()->json([
            'error' => true,
            'message' => 'Authentication failed',
        ], 403);
    }

    function get_login() {
        return response()->json([
            'error' => true,
            'message' => 'Please login to access this resource',
        ], 403);
    }
}
