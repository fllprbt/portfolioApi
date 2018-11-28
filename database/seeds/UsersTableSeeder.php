<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
  public function run()
  {
      DB::table('users')->delete();

      User::create(array(
          'name'     => 'test',
          'email'    => 'test@user.com',
          'password' => Hash::make('test'),
      ));
  }
}
