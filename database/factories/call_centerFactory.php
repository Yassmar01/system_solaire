<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\call_center>
 */
class call_centerFactory extends Factory
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
            'fullname' => fake()->name(),
            'telephone' => fake()->phoneNumber(),
            'email' => fake()->email(),
            'password' => Hash::make('12345678'),
        ];
    }
}