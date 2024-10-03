<?php

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
        Schema::table('clients', function (Blueprint $table)
        {
            // Replace 'column_name1' and 'column_name2' with the actual column names you want to drop
            $table->dropColumn(['fullname', 'telephone','adress','ville','province']);
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('clients', function (Blueprint $table) {
            // Add the columns back with their original definitions if you need to rollback
            $table->string('fullname');
            $table->string('telephone');
            $table->string('adress');
            $table->string('ville');
            $table->string('province');
            // Adjust the column types based on your original table schema
        });
    }
};