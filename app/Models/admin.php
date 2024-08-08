<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class admin extends User
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $appends =['role'];
    public function getRoleAttribute(){
        return 'admin';
    }
}
