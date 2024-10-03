<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class charge extends Model
{
    use HasFactory,SoftDeletes;


    protected $fillable = [
        "prix",
        "label",
        'quantity',
        'invoice',
        'chef_equipe_id'
    ];


    protected $hidden = [

        'created_at',
        'updated_at'

    ];

    public function chefequipe()
    {
        return $this->belongsTo(chef_equipe::class);
    }
}