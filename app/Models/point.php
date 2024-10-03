<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class point extends Model
{
    use HasFactory,SoftDeletes;


    protected $fillable = [

        'etude_operation_id',
        'lebele',

        	'price'
          ];
          protected $hidden = [

              'created_at',
              'updated_at'

          ];

    public function operations()
    {
        return $this->belongsTo(etude_operation::class);
    }
}