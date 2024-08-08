<?php

namespace Database\Factories;

use App\Models\etude_operation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\point>
 */
class pointFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $operations = etude_operation::all();
        return [

            'etude_operation_id' => $operations->random()->id,
            'lebele'=>fake()->name(),
            'price'=>fake()->randomDigit(),
            'date'=>fake()->date(),
        ];
    }
}