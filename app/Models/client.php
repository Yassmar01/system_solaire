<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class client extends Model
{
    use HasFactory,SoftDeletes;


    public function calls()
    {
        return $this->hasMany(Call::class);
    }

    public function columns()
    {
        return $this->hasMany(column::class);
    }
    public function operations()
    {
        return $this->hasMany(etude_operation::class);
    }
}