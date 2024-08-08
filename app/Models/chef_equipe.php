<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class chef_equipe extends User
{
    //use HasFactory,SoftDeletes;

    use HasApiTokens, HasFactory, Notifiable,SoftDeletes;
    protected $appends =['role'];
    public function getRoleAttribute(){
        return 'chefequipe';
    }

    protected $fillable = [
        'fullname',
        'CIN',
        'telephone',
        'province',
        'email',
        'password',
    ];
    protected $hidden = [
        'password',
        'created_at',
        'updated_at'

    ];

    public function charges()
    {
        return $this->hasMany(charge::class);
    }

}