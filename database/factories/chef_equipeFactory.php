<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\chef_equipe>
 */
class chef_equipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'CIN' => fake()->password(),
            'fullname' =>  fake()->name(),
            'telephone' =>  fake()->phoneNumber(),
            'province' =>  fake()->city(),
            'email' => fake()->email(),
            'password' => Hash::make('12345678'),
        ];
    }
}