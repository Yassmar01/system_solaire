<?php

namespace Database\Seeders;

use App\Models\client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class seed_clients extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        client::factory(100)->create();

        // client::factory()->create([
        //     'CIN' => fake()->password(),
        //     'fullname' =>  fake()->name(),
        //     'telephone' =>  fake()->phoneNumber(),
        //     'adress' =>  fake()->address(),
        //     'province' =>  fake()->city(),
        //     'ville' =>  fake()->city(),
        // ]);
    }
}