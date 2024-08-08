<?php

namespace App\Http\Requests;

use App\Rules\UniqueAcrossTables;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class Updatechef_equipeRequest extends FormRequest
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
            'province'=>'required',
            'CIN' => [
                'required',
                'max:50',
                new UniqueAcrossTables(['call_centers', 'chef_equipes'],$this->route('chefequipe')->id),

            ],
            'telephone' => 'required|max:10',
            'email' => [
                'required',
                'email',
                new UniqueAcrossTables(['call_centers','sysadmins', 'chef_equipes'],$this->route('chefequipe')->id),

            ],
            'password' => 'required|min:6',
        ];
    }
}