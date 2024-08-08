<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class etude_operation extends Model
{
    use HasFactory,SoftDeletes;


    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function point()
    {
        return $this->hasMany(point::class);
    }
}