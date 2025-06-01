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
        $permissions = [
        'lapak index',
        'lapak create',
        'lapak edit',
        'lapak delete',

        'member index',
        'member create',
        'member edit',
        'member delete',

        'user index',
        'user create',
        'user edit',
        'user delete',

        'post index',
        'post create',
        'post edit',
        'post delete',

        'community index',
        'community create',
        'community edit',
        'community delete',
    ];

    foreach ($permissions as $permissionName) {
        Permission::create([
            'name' => $permissionName,
            'guard_name' => 'web',
        ]);
    }
    }
}
