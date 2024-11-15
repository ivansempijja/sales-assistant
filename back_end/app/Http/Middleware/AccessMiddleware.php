<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AccessMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user_role = Auth::user()->role;
        if($user_role != "Admin" && $user_role != "Sales Manager") {
            return response()->json([
                'error' => true,
                'message' => 'You can not access this resource',
            ], 403);
        }

        return $next($request);
    }
}
