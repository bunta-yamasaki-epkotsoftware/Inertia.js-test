<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Todos;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Todos::factory()->count(10)->create();
    }
}
