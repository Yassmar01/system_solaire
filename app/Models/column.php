<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class column extends Model
{
    use HasFactory;


    protected $fillable = [

  "client_id",
 "column_name",
 "value"
    ];
    protected $hidden = [

        'created_at',
        'updated_at'

    ];
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}