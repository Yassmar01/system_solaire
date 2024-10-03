<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Storeetude_operationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name_activity'=>'required',
            'hectares'=>'required',

            'date'=> 'required' ,
            'client_id'=> 'required',
            'chef_equipe_id'=> 'required' ,
        ];
}
}