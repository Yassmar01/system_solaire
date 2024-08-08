<?php

namespace App\Http\Requests;


use App\Rules\UniqueAcrossTables;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class Updatecall_centerRequest extends FormRequest
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
            'fullname' => 'required|max:50',
            'CIN' => [
                'required',
                'max:50',
                new UniqueAcrossTables(['call_centers', 'chef_equipes'],$this->route('callcenter')->id),

            ],
            'telephone' => 'required|max:10',
            'email' => [
                'required',
                'email',
                new UniqueAcrossTables(['call_centers','sysadmins', 'chef_equipes'],$this->route('callcenter')->id),

            ],
            'password' => 'required|min:6',
        ];
    }
}