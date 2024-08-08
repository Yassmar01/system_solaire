<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class call_center extends User
{
    use HasApiTokens, HasFactory, Notifiable,SoftDeletes;

    protected $appends =['role'];
    public function getRoleAttribute(){
        return 'callcenter';
    }


    protected $fillable = [
        'fullname',
        'CIN',
        'telephone',
        'email',
        'password',

    ];
    protected $hidden = [
        'password',
        'created_at',
        'updated_at'

    ];
}