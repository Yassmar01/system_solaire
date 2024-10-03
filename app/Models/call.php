<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class call extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        "call_center_id",
  "client_id",
  "statue",
  "delivered",
  "remarque",
  "date",
  "RDV_call"
    ];
    protected $hidden = [

        'created_at',
        'updated_at'

    ];
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function call_center()
    {
        return $this->belongsTo(call_center::class);
    }
}