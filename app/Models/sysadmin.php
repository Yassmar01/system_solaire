<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class sysadmin extends User
{
    use HasApiTokens, HasFactory, Notifiable;


    protected $appends =['role'];
    public function getRoleAttribute(){
        return 'sysadmin';
    }
}