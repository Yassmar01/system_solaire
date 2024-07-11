<?php

use App\Models\chef_equipe;
use App\Models\client;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('etude_operations', function (Blueprint $table) {
            $table->id();
            $table->decimal('prix_etude', 8, 2);
            $table->string('name_activity');
            $table->integer('count_points');
            $table->date('date');
            $table->foreignIdFor(client::class);
            $table->foreignIdFor(chef_equipe::class);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('etude_operations');
    }
};