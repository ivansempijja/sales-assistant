<?php

namespace App\Providers;

use App\Models\FollowUp;
use App\Observers\FollowUpObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        FollowUp::observe(FollowUpObserver::class);
    }
}
