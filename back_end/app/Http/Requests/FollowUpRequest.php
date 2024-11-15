<?php

namespace App\Http\Requests;

use App\Rules\FutureDate;
use Illuminate\Foundation\Http\FormRequest;

class FollowUpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //set true so auth is not required
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'lead_id' => 'required|exists:leads,id',
            'scheduled_at' => ['required', 'date', 'date_format:Y-m-d', new FutureDate],
            'status' => 'nullable|in:Pending,Completed,Missed', //not required since default is provided
        ];
    }
}
