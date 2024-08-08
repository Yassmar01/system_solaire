<?php

namespace App\Http\Requests;

use App\Rules\UniqueAcrossTables;
use Illuminate\Foundation\Http\FormRequest;

class StoresysadminRequest extends FormRequest
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
    //     return [
    //  'fullname'=>'required|max:50',
    //     'email'=>'required|email|unique:sysadmins',

    //     'password'=>'required|min:6',
    //     ];


    return [
        'fullname' => 'required|max:50',

       
        'email' => [
            'required',
            'email',
            new UniqueAcrossTables(['call_centers','sysadmins', 'chef_equipes']),

        ],
        'password' => 'required|min:6',
    ];
    }
}