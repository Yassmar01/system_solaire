<?php

namespace App\Http\Requests;

use App\Rules\UniqueAcrossTables;
use Illuminate\Foundation\Http\FormRequest;

class Storechef_equipeRequest extends FormRequest
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
        // 'CIN'=>'required|max:50|unique:chef_equipes',
        // 'telephone'=>'required|max:10',
        // 'province'=>'required',

        // 'email'=>'required|email|unique:chef_equipes',
        // 'password'=>'required|min:6',
        // ];

        return [
            'fullname' => 'required|max:50',
            'province'=>'required',
            'CIN' => [
                'required',
                'max:50',
                new UniqueAcrossTables(['call_centers', 'chef_equipes']),

            ],
            'telephone' => 'required|max:10',
            'email' => [
                'required',
                'email',
                new UniqueAcrossTables(['call_centers','sysadmins', 'chef_equipes']),

            ],
            'password' => 'required|min:6',
        ];


    }
}