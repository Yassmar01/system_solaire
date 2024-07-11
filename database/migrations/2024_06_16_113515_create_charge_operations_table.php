<?php


use App\Models\etude_operation;
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
        Schema::create('charge_operations', function (Blueprint $table) {
            $table->id();
            $table->decimal('prix', 8, 2);
            $table->string('label');
            $table->string('invoice');
            $table->foreignIdFor(etude_operation::class);
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
        Schema::dropIfExists('charge_operations');
    }
};