<?php

namespace App\Http\Requests;

use App\Rules\UniqueAcrossTables;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatesysadminRequest extends FormRequest
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
        // return [
        //     'fullname'=>'required|max:50',
        //  //      'email'=>'required|email|unique:sysadmins',
        //        'email' => [
        //         'required',
        //         'email',
        //         Rule::unique('sysadmins', 'email')->ignore($this->route('sysadmin')->id),
        //     ],
        //        'password'=>'required|min:6',
        //        ];



        return [
            'fullname' => 'required|max:50',

            'email' => [
                'required',
                'email',
                new UniqueAcrossTables(['call_centers','sysadmins', 'chef_equipes'],$this->route('sysadmin')->id),

            ],
            'password' => 'required|min:6',
        ];
    }
}