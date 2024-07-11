<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        \App\Models\user::factory(10)->create();

        \App\Models\admin::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123456789'),
        ]);

        \App\Models\sysadmin::factory()->create([
            'name' => 'sysadmin',
            'email' => 'sysadmin@gmail.com',
            'password' => Hash::make('123456789'),
        ]);

        \App\Models\call_center::factory()->create([
            'CIN' => 'D1234',
            'fullname' => 'sara',
            'telephone' => '06xxxxx',
            'email' => 'callcenter@gmail.com',
            'password' => Hash::make('123456789'),
        ]);

        \App\Models\chef_equipe::factory()->create([
            'CIN' => 'D1234',
            'fullname' => 'ahmed',
            'telephone' => '06xxxxx',
            'province' => 'meknes',
            'email' => 'tech@gmail.com',
            'password' => Hash::make('123456789'),
        ]);
    }
}