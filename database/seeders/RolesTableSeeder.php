<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::create(['name' => 'admin']);
        $userRole = Role::create(['name' => 'user']);

        $adminPermissions = Permission::all();

        $userPermissions = [
            'lapak index',
            'lapak create',
            'lapak edit',
            'lapak delete',

            'post index',
            'post create',
            'post edit',
            'post delete',

            'community index',
            'community create',
            'community edit',
            'community delete',
        ];

        $adminRole->syncPermissions($adminPermissions);
        $userRole->syncPermissions($userPermissions);
    }
}