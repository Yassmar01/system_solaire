<?php

namespace Database\Seeders;

use App\Models\call_center;
use App\Models\chef_equipe;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class SeederData extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        call_center::factory(15)->create();
        call_center::factory()->create([
            'CIN' => fake()->password(),
            'fullname' => fake()->name(),
            'telephone' => fake()->phoneNumber(),
            'email' => fake()->email(),
            'password' => Hash::make('12345678'),
        ]);


        chef_equipe::factory(15)->create();

        chef_equipe::factory()->create([
            'CIN' => fake()->password(),
            'fullname' =>  fake()->name(),
            'telephone' =>  fake()->phoneNumber(),
            'province' =>  fake()->city(),
            'email' => fake()->email(),
            'password' => Hash::make('12345678'),
        ]);
    }
}