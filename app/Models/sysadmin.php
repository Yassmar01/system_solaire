<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class sysadmin extends User
{
    use HasApiTokens, HasFactory, Notifiable,SoftDeletes;


    protected $appends =['role'];
    public function getRoleAttribute(){
        return 'sysadmin';
    }


    protected $fillable = [
        'fullname',
        'email',
        'password',
    ];
    protected $hidden = [
        'password',
        'created_at',
        'updated_at'

    ];
}