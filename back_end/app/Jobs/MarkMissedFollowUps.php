<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Carbon;
use App\Models\FollowUp;

class MarkMissedFollowUps implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        
        $now = Carbon::now();

        //get all followups that are over due and not completed
        FollowUp::where('scheduled_at', '<', $now)
            ->where('status', '!=', 'Completed')
            ->update(['status' => 'Missed']);
    }
}
