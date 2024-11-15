<?php

namespace App\Observers;

use App\Events\FollowUpStatusChanged;
use App\Models\FollowUp;

class FollowUpObserver
{
    /**
     * Handle the FollowUp "created" event.
     */
    public function created(FollowUp $followUp): void
    {
        //
    }

    /**
     * Handle the FollowUp "updated" event.
     */
    public function updated(FollowUp $followUp): void
    {
        if ($followUp->isDirty('status')) {
            FollowUpStatusChanged::dispatch($followUp);
        }
    }

    /**
     * Handle the FollowUp "deleted" event.
     */
    public function deleted(FollowUp $followUp): void
    {
        //
    }

    /**
     * Handle the FollowUp "restored" event.
     */
    public function restored(FollowUp $followUp): void
    {
        //
    }

    /**
     * Handle the FollowUp "force deleted" event.
     */
    public function forceDeleted(FollowUp $followUp): void
    {
        //
    }
}
