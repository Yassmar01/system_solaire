<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\call;
use App\Models\call_center;
use App\Models\client;
use App\Models\etude_operation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
      //  \App\Models\user::factory(10)->create();

       // \App\Models\charge::factory(100)->create();
        \App\Models\point::factory(100)->create();



    //   $clients = client::all();
    //   $callcenters = call_center::all();

      // Create 100 calls with random client and callcenters IDs
    //   foreach (range(1, 100) as $index) {
    //       call::create([
    //           'statue' => 'Injoignable',
    //           'remarque' => 'Le client est injoignable apres plusieur appels',
    //           'date' => $clients->random()->created_at,
    //           'client_id' => $clients->random()->id,
    //           'call_center_id' => $callcenters->random()->id,
    //       ]);
    //   }


//       // Create  operations with random client and chefs IDs
//       $clients = client::all();
//       $chefs = call_center::all();
//    foreach (range(1, 100) as $index) {
//           etude_operation::create([
//               'prix_etude' => fake()->randomDigit,
//               'name_activity' => 'procpection',
//               'count_points' => fake()->numberBetween(0, 30),
//               'date' =>fake()->date,
//               'client_id' => $clients->random()->id,
//               'chef_equipe_id' => $chefs->random()->id,
//           ]);
//       }

    }
}