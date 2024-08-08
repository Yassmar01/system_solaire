<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
        'fullname' => fake()->name(),
        'telephone' => fake()->phoneNumber(),
        'adress' =>  fake()->address(),
        'ville' =>  fake()->city(),
        'province' =>  fake()->city(),
        ];
    }
}