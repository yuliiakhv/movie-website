<?php
use backend\Route;

spl_autoload_register(function ($name) {
    include ROOT."/backend/".$name.'.php';
    
});


require_once 'backend/route.php';
require_once 'backend/web.php';
require_once 'backend/services/database.php';

Route::start();