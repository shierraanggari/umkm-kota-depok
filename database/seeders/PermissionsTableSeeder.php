<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'lapak index', 'guard_name' => 'web']);
        Permission::create(['name' => 'lapak create', 'guard_name' => 'web']);
        Permission::create(['name' => 'lapak edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'lapak delete', 'guard_name' => 'web']);

        Permission::create(['name' => 'member index', 'guard_name' => 'web']);
        Permission::create(['name' => 'member create', 'guard_name' => 'web']);
        Permission::create(['name' => 'member edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'member delete', 'guard_name' => 'web']);

        Permission::create(['name' => 'user index', 'guard_name' => 'web']);
        Permission::create(['name' => 'user create', 'guard_name' => 'web']);
        Permission::create(['name' => 'user edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'user delete', 'guard_name' => 'web']);

        Permission::create(['name' => 'post index', 'guard_name' => 'web']);
        Permission::create(['name' => 'post create', 'guard_name' => 'web']);
        Permission::create(['name' => 'post edit own', 'guard_name' => 'web']);
        Permission::create(['name' => 'post edit any', 'guard_name' => 'web']);
        Permission::create(['name' => 'post delete own', 'guard_name' => 'web']);
        Permission::create(['name' => 'post delete any', 'guard_name' => 'web']);
    }
}
