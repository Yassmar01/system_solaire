<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class etude_operation extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'name_activity',
        'hectares',
        'date' ,
        'delivered',
        'client_id',
        'chef_equipe_id',

    ];
    protected $hidden = [

        'created_at',
        'updated_at'

    ];
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function point()
    {
        return $this->hasMany(point::class);
    }
}