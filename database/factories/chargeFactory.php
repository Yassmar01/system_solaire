<?php

namespace Database\Factories;

use App\Models\chef_equipe;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\charge>
 */
class chargeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $chefs = chef_equipe::all();
        return [

            'prix'=>fake()->randomDigit(),
            'label'=>fake()->text(),
            'quantity'=>fake()->numberBetween(1,20),
            'invoice'=>fake()->filePath(),
            'chef_equipe_id' => $chefs->random()->id,
        ];
    }
}