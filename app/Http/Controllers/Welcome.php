<?php

namespace App\Http\Controllers;

class Welcome extends Controller {

  public function index()
  {
    return view('app');
  }
}
