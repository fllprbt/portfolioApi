<?php

namespace App\Http\Middleware;

use Closure;

class AddAuthHeader
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $access_token = config('constants.options.access_token');

        if (!$request->bearerToken()) {
            if ($request->hasCookie($access_token)) {
                $token = $request->cookie($access_token);
                $request->headers->add(['Authorization' => 'Bearer ' . $token]);
            }
        }

        return $next($request);
    }
}
