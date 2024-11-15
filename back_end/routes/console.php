<?php

use App\Jobs\MarkMissedFollowUps;
use Illuminate\Support\Facades\Schedule;



//schedule to run the job daily
Schedule::job(new MarkMissedFollowUps)->hourly();
