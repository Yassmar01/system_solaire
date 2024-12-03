<?php

namespace Database\Seeders;

use App\Models\admin as ModelsAdmin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class admin extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insert([
            'fullname' => str::random(10),
            'email' => Str::random(10).'@example.com',
            'password' => Hash::make('123456789'),
        ]);
    }
}